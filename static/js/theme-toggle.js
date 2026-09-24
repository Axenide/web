(function() {
  const STORAGE_KEY = 'theme-preference';
  const FRUTIGER_PREV_KEY = 'theme-frutiger-previous';
  const THEME_LIGHT = 'light';
  const THEME_DARK = 'dark';
  const THEME_AUTO = 'auto';
  const THEME_FRUTIGER = 'frutiger';

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

  function isFrutigerActive() {
    return document.documentElement.getAttribute('data-theme') === THEME_FRUTIGER;
  }

  // One-time cleanup: frutiger used to be a persisted theme; it is now a
  // live-only state that dies on reload or navigation.
  function migrateLegacyFrutiger() {
    const saved = getSavedTheme();
    if (saved !== THEME_FRUTIGER) return saved;
    const prev = localStorage.getItem(FRUTIGER_PREV_KEY) || THEME_AUTO;
    localStorage.removeItem(FRUTIGER_PREV_KEY);
    localStorage.setItem(STORAGE_KEY, prev);
    return prev;
  }

  function applyTheme(theme) {
    const effective = theme === THEME_AUTO ? getSystemTheme() : theme;
    document.documentElement.setAttribute('data-theme', effective);
    document.documentElement.style.colorScheme = effective === THEME_FRUTIGER ? THEME_LIGHT : effective;
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
    const globe = btn.querySelector('.icon-globe');

    // Hide all first
    if (sun) sun.style.display = 'none';
    if (moon) moon.style.display = 'none';
    if (auto) auto.style.display = 'none';
    if (globe) globe.style.display = 'none';

    // Show only the active one
    if (current === THEME_FRUTIGER && globe) {
      globe.style.display = 'block';
      btn.title = 'Salir de Frutiger Aero';
    } else if (current === THEME_LIGHT && sun) {
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
    if (isFrutigerActive()) {
      exitFrutiger();
      return;
    }
    const current = getSavedTheme();
    let next;
    if (current === THEME_AUTO) next = THEME_LIGHT;
    else if (current === THEME_LIGHT) next = THEME_DARK;
    else next = THEME_AUTO;
    saveTheme(next);
  }

  let flashTimer = null;
  let flashTarget = null;
  const FLASH_MS = 1500;

  // Prelude flash: pulse the trigger's container to the frutiger palette
  // (colors only) via a CSS animation on the container element. onDone
  // fires when the flash is over (or immediately if it was skipped), so the
  // trigger can release its click lock.
  function flashFrutiger(container, onDone) {
    if (isFrutigerActive()) {
      if (onDone) onDone();
      return;
    }
    const target = container || document.documentElement;
    target.classList.remove('frutiger-flash');
    void target.offsetWidth;
    target.classList.add('frutiger-flash');
    flashTarget = target;
    clearTimeout(flashTimer);
    flashTimer = setTimeout(() => {
      flashTimer = null;
      if (flashTarget) flashTarget.classList.remove('frutiger-flash');
      flashTarget = null;
      if (onDone) onDone();
    }, FLASH_MS);
  }

  function enterFrutiger() {
    if (isFrutigerActive()) return;
    clearTimeout(flashTimer);
    flashTimer = null;
    if (flashTarget) flashTarget.classList.remove('frutiger-flash');
    flashTarget = null;
    applyTheme(THEME_FRUTIGER);
    updateButton(THEME_FRUTIGER);
  }

  function exitFrutiger() {
    localStorage.removeItem(FRUTIGER_PREV_KEY);
    saveTheme(getSavedTheme());
  }

  window.ThemeToggle = { enterFrutiger, flashFrutiger };

  function init() {
    const saved = migrateLegacyFrutiger();
    applyTheme(saved);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
      if (getSavedTheme() === THEME_AUTO && !isFrutigerActive()) applyTheme(THEME_AUTO);
    });

    // A bfcache restore skips init, so drop a stale frutiger state on back/forward.
    window.addEventListener('pageshow', function(event) {
      if (event.persisted && isFrutigerActive()) exitFrutiger();
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
