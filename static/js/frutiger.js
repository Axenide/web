(function() {
  const CLICKS_NEEDED = 3;
  const FLASH_MS = 1500; // keep in sync with FLASH_MS in theme-toggle.js
  const MAX_VOLUME = 0.5;
  const FRUTIGER = 'frutiger';

  function init() {
    const trigger = document.getElementById('frutiger');
    if (!trigger) return;

    const mii = new Audio('/home/mii.opus');
    mii.preload = 'auto';

    let fadeFrame = null;

    function stopPlayback() {
      if (fadeFrame) cancelAnimationFrame(fadeFrame);
      fadeFrame = null;
      mii.pause();
      mii.currentTime = 0;
    }

    function playSnippet() {
      stopPlayback();
      mii.volume = MAX_VOLUME;
      mii.play().catch(() => {});
      const start = performance.now();
      const fade = (now) => {
        const t = Math.min((now - start) / FLASH_MS, 1);
        mii.volume = MAX_VOLUME * (1 - t);
        if (t < 1) {
          fadeFrame = requestAnimationFrame(fade);
        } else {
          fadeFrame = null;
          mii.pause();
          mii.currentTime = 0;
        }
      };
      fadeFrame = requestAnimationFrame(fade);
    }

    function playFull() {
      stopPlayback();
      mii.volume = MAX_VOLUME;
      mii.play().catch(() => {});
    }

    // Frutiger only lives while data-theme says so; kill the audio on exit.
    new MutationObserver(() => {
      if (document.documentElement.getAttribute('data-theme') !== FRUTIGER) stopPlayback();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    let clicks = 0;

    trigger.addEventListener('click', () => {
      clicks += 1;

      if (clicks >= CLICKS_NEEDED) {
        clicks = 0;
        if (window.ThemeToggle) {
          window.ThemeToggle.enterFrutiger();
          playFull();
        }
        return;
      }

      if (!window.ThemeToggle) return;

      // Sans-style spam protection: the trigger locks while the prelude
      // animation runs, so each stage plays out before the next click.
      const target = clicks === 1
        ? (trigger.closest('li') || trigger)
        : (trigger.closest('article') || trigger.parentElement);
      trigger.disabled = true;
      playSnippet();
      window.ThemeToggle.flashFrutiger(target, () => {
        trigger.disabled = false;
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
