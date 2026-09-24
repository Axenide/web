(function() {
  const BACK_COUNT = 14;
  const FRONT_COUNT = 8;
  let backLayer = null;
  let frontLayer = null;

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createBubble(front) {
    const wrapper = document.createElement('div');
    wrapper.className = 'frutiger-bubble';
    const orb = document.createElement('div');
    orb.className = 'frutiger-bubble-orb';

    orb.style.setProperty('--size', (front ? random(10, 34) : random(6, 26)) + 'px');
    orb.style.setProperty('--sway-x', random(8, 36).toFixed(1) + 'px');
    orb.style.setProperty('--sway', random(3, 6).toFixed(2) + 's');

    const rise = front ? random(9, 16) : random(16, 28);
    wrapper.style.setProperty('--x', random(0, 100).toFixed(1) + 'vw');
    wrapper.style.setProperty('--rise', rise.toFixed(2) + 's');
    wrapper.style.setProperty('--delay', (-random(0, rise)).toFixed(2) + 's');

    wrapper.appendChild(orb);
    return wrapper;
  }

  function createLayer(front) {
    const layer = document.createElement('div');
    layer.className = 'frutiger-bubbles' + (front ? ' front' : '');
    const count = front ? FRONT_COUNT : BACK_COUNT;
    for (let i = 0; i < count; i++) layer.appendChild(createBubble(front));
    document.body.appendChild(layer);
    return layer;
  }

  function start() {
    if (backLayer) return;
    backLayer = createLayer(false);
    frontLayer = createLayer(true);
  }

  function stop() {
    if (backLayer) backLayer.remove();
    if (frontLayer) frontLayer.remove();
    backLayer = null;
    frontLayer = null;
  }

  function sync() {
    if (document.documentElement.getAttribute('data-theme') === 'frutiger') start();
    else stop();
  }

  new MutationObserver(sync).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
  sync();
})();
