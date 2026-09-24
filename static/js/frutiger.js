(function() {
  const CLICK_WINDOW = 2000;
  const CLICKS_NEEDED = 3;

  function init() {
    const trigger = document.getElementById('frutiger');
    if (!trigger) return;

    let clicks = 0;
    let timer = null;

    trigger.addEventListener('click', () => {
      clicks += 1;
      clearTimeout(timer);
      timer = setTimeout(() => {
        clicks = 0;
      }, CLICK_WINDOW);

      if (clicks >= CLICKS_NEEDED) {
        clicks = 0;
        clearTimeout(timer);
        if (window.ThemeToggle) window.ThemeToggle.enterFrutiger();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
