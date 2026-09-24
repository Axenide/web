(function() {
  const CLICK_WINDOW = 3000;
  const CLICKS_NEEDED = 3;

  function init() {
    const trigger = document.getElementById('frutiger');
    if (!trigger) return;

    let clicks = 0;
    let timer = null;

    function scheduleReset() {
      clearTimeout(timer);
      timer = setTimeout(() => {
        clicks = 0;
      }, CLICK_WINDOW);
    }

    trigger.addEventListener('click', () => {
      clicks += 1;

      if (clicks >= CLICKS_NEEDED) {
        clicks = 0;
        clearTimeout(timer);
        if (window.ThemeToggle) window.ThemeToggle.enterFrutiger();
        return;
      }

      if (!window.ThemeToggle) {
        scheduleReset();
        return;
      }

      // Sans-style spam protection: the trigger locks while the prelude
      // animation runs, so each stage plays out before the next click. The
      // stage counter only starts decaying once the trigger unlocks.
      const target = clicks === 1
        ? (trigger.closest('li') || trigger)
        : (trigger.closest('article') || trigger.parentElement);
      trigger.disabled = true;
      window.ThemeToggle.flashFrutiger(target, () => {
        trigger.disabled = false;
        scheduleReset();
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
