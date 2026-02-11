(function() {
  const STORAGE_KEY = 'theme-preference';
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';
  const THEME_AUTO = 'auto';

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? THEME_DARK : THEME_LIGHT;
  }

  function getSavedTheme() {
    return localStorage.getItem(STORAGE_KEY) || THEME_AUTO;
  }

  function getEffectiveTheme() {
    const saved = getSavedTheme();
    return saved === THEME_AUTO ? getSystemTheme() : saved;
  }

  function applyTheme(theme) {
    const effective = theme === THEME_AUTO ? getSystemTheme() : theme;
    document.documentElement.setAttribute('data-theme', effective);
    document.documentElement.style.colorScheme = effective;
  }

  function saveTheme(theme) {
    localStorage.setItem(STORAGE_KEY, theme);
    applyTheme(theme);
    updateButton(theme);
  }

  function updateButton(current) {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    const sun = btn.querySelector('.icon-sun');
    const moon = btn.querySelector('.icon-moon');
    const auto = btn.querySelector('.icon-auto');

    // Hide all first
    if (sun) sun.style.display = 'none';
    if (moon) moon.style.display = 'none';
    if (auto) auto.style.display = 'none';

    // Show only the active one
    if (current === THEME_LIGHT && sun) {
      sun.style.display = 'block';
      btn.title = 'Cambiar a oscuro';
    } else if (current === THEME_DARK && moon) {
      moon.style.display = 'block';
      btn.title = 'Cambiar a automático';
    } else if (auto) {
      auto.style.display = 'block';
      btn.title = 'Cambiar a claro';
    }

    // Add initialized class to show the icon
    btn.classList.add('initialized');
  }

  function cycleTheme() {
    const current = getSavedTheme();
    let next;
    if (current === THEME_AUTO) next = THEME_LIGHT;
    else if (current === THEME_LIGHT) next = THEME_DARK;
    else next = THEME_AUTO;
    saveTheme(next);
  }

  function init() {
    const saved = getSavedTheme();
    applyTheme(saved);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
      if (getSavedTheme() === THEME_AUTO) applyTheme(THEME_AUTO);
    });

    const btn = document.getElementById('theme-toggle');
    if (btn) {
      updateButton(saved);
      btn.addEventListener('click', cycleTheme);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
