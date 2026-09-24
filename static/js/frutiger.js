(function() {
  const CLICKS_NEEDED = 3;
  const FLASH_MS = 1500; // keep in sync with FLASH_MS in theme-toggle.js
  const MAX_VOLUME = 0.5;
  const FRUTIGER = 'frutiger';
  // Keep in sync with the frutiger body background in sass/base/_base.scss.
  const WALLPAPER = '/images/asadal_stock_66.jpg';

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

    // One-shot bubble burst from the trigger, used by the prelude clicks.
    // Each pop cleans itself up on animationend.
    function burstBubbles() {
      const rect = trigger.getBoundingClientRect();
      for (let i = 0; i < 8; i++) {
        const pop = document.createElement('div');
        pop.className = 'frutiger-pop';
        pop.style.left = rect.left + Math.random() * rect.width + 'px';
        pop.style.top = rect.top + Math.random() * rect.height + 'px';
        pop.style.setProperty('--size', Math.round(6 + Math.random() * 14) + 'px');
        pop.style.setProperty('--dx', (Math.random() * 60 - 30).toFixed(1) + 'px');
        pop.style.setProperty('--rise', Math.round(40 + Math.random() * 60) + 'px');
        pop.style.animationDuration = (0.9 + Math.random() * 0.5).toFixed(2) + 's';
        pop.style.animationDelay = (Math.random() * 0.4).toFixed(2) + 's';
        pop.addEventListener('animationend', () => pop.remove());
        document.body.appendChild(pop);
      }
    }

    // Frutiger only lives while data-theme says so; kill the audio on exit.
    new MutationObserver(() => {
      if (document.documentElement.getAttribute('data-theme') !== FRUTIGER) stopPlayback();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // The wallpaper is only fetched once frutiger activates (the CSS rule
    // does not match otherwise); warm the cache on the first prelude click
    // so the definitive mode shows it instantly.
    let wallpaperPreloaded = false;

    function preloadWallpaper() {
      if (wallpaperPreloaded) return;
      wallpaperPreloaded = true;
      new Image().src = WALLPAPER;
    }

    let clicks = 0;

    trigger.addEventListener('click', () => {
      // Once frutiger is live the trigger's show is over; extra clicks must
      // never restart the music.
      if (document.documentElement.getAttribute('data-theme') === FRUTIGER) return;

      clicks += 1;

      if (clicks === 1) preloadWallpaper();

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
      burstBubbles();
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
