(function() {
  const CLICKS_NEEDED = 3;
  const FLASH_MS = 1500; // keep in sync with FLASH_MS in theme-toggle.js
  const MAX_VOLUME = 0.5;
  const FRUTIGER = 'frutiger';
  // Keep in sync with the frutiger body background in sass/base/_base.scss.
  const WALLPAPER = '/images/asadal_stock_66.jpg';
  const TRACKS = ['aquatic', 'lease', 'lotus', 'mii', 'party'];
  const TRACK_URL = (index) => '/home/aero/' + TRACKS[index] + '.opus';

  function init() {
    const trigger = document.getElementById('frutiger');
    if (!trigger) return;

    // Web Audio instead of an <audio> element: buffer playback never
    // registers with the browser's media session, so Android notifications
    // and MPRIS players (playerctl) never see these tracks.
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const gainNode = audioCtx.createGain();
    gainNode.connect(audioCtx.destination);

    const trackBuffers = {};
    const trackPromises = {};
    let currentSource = null;
    let playToken = 0;
    let playStartTime = 0;
    let pausedOffset = null; // seconds into the buffer while hidden; null = not paused
    let playingFull = false; // full playback (pausable) vs snippet fade (not)

    function stopPlayback() {
      if (currentSource) {
        try { currentSource.stop(); } catch (e) {}
        currentSource = null;
      }
      playingFull = false;
      gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
    }

    async function ensureTrack(index) {
      const name = TRACKS[index];
      if (trackBuffers[name] === undefined) {
        // Promise cache: parallel preload and on-demand plays share one
        // fetch per track.
        if (trackPromises[name] === undefined) {
          trackPromises[name] = (async () => {
            try {
              const response = await fetch(TRACK_URL(index));
              trackBuffers[name] = await audioCtx.decodeAudioData(await response.arrayBuffer());
            } catch (e) {
              trackBuffers[name] = null;
            }
            return trackBuffers[name];
          })();
        }
      }
      return trackPromises[name];
    }

    async function playFromStart(offset = 0) {
      const token = ++playToken;
      stopPlayback();
      if (audioCtx.state === 'suspended') await audioCtx.resume();
      const buffer = await ensureTrack(trackIndex);
      if (!buffer || token !== playToken) return false;
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(gainNode);
      gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
      gainNode.gain.setValueAtTime(MAX_VOLUME, audioCtx.currentTime);
      source.start(0, Math.min(offset, buffer.duration));
      playStartTime = audioCtx.currentTime;
      pausedOffset = null;
      currentSource = source;
      return true;
    }

    async function playSnippet() {
      if (!(await playFromStart())) return;
      playingFull = false;
      const now = audioCtx.currentTime;
      gainNode.gain.setValueAtTime(MAX_VOLUME, now);
      gainNode.gain.linearRampToValueAtTime(0, now + FLASH_MS / 1000);
      const played = currentSource;
      setTimeout(() => {
        if (currentSource !== played) return;
        try { played.stop(); } catch (e) {}
        currentSource = null;
        gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
      }, FLASH_MS);
    }

    async function playFull() {
      if (!(await playFromStart())) return;
      playingFull = true;
    }

    // Frutiger only lives while data-theme says so; kill the audio on exit.
    new MutationObserver(() => {
      if (document.documentElement.getAttribute('data-theme') !== FRUTIGER) stopPlayback();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // Web Audio keeps playing while the page is backgrounded (Android app
    // switch included). Full playback pauses and resumes where it left
    // off; the 1.5s snippets are too short to be worth resuming and just
    // stop.
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        if (playingFull && currentSource) {
          const elapsed = Math.min(
            audioCtx.currentTime - playStartTime,
            currentSource.buffer.duration
          );
          pausedOffset = Math.max(elapsed, 0);
          gainNode.gain.cancelScheduledValues(audioCtx.currentTime);
          try { currentSource.stop(); } catch (e) {}
          currentSource = null;
          playingFull = false;
        } else {
          stopPlayback();
        }
      } else if (pausedOffset !== null) {
        const offset = pausedOffset;
        pausedOffset = null;
        if (document.documentElement.getAttribute('data-theme') === FRUTIGER) playFromStart(offset);
      }
    });

    // Preload every track once the page settles (~1.6 MB total), so the
    // random pick always plays instantly.
    function preloadTracks() {
      for (let i = 0; i < TRACKS.length; i++) ensureTrack(i);
    }

    if (document.readyState === 'complete') preloadTracks();
    else window.addEventListener('load', preloadTracks, { once: true });

    // The wallpaper is only fetched once frutiger activates (the CSS rule
    // does not match otherwise); warm the cache on the first prelude click
    // so the definitive mode shows it instantly.
    let wallpaperPreloaded = false;

    function preloadWallpaper() {
      if (wallpaperPreloaded) return;
      wallpaperPreloaded = true;
      new Image().src = WALLPAPER;
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

    let clicks = 0;

    trigger.addEventListener('click', () => {
      // Once frutiger is live, clicks cycle through the tracks.
      if (document.documentElement.getAttribute('data-theme') === FRUTIGER) {
        trackIndex = (trackIndex + 1) % TRACKS.length;
        playFull();
        return;
      }

      clicks += 1;

      // A fresh run picks its track randomly; the prelude and the
      // definitive playback then stay on it.
      if (clicks === 1) {
        preloadWallpaper();
        trackIndex = Math.floor(Math.random() * TRACKS.length);
      }

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
