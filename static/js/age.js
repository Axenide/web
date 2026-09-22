(function() {
  const ageEl = document.getElementById('age');
  if (!ageEl) return;

  const birth = 992304000;
  const yearSeconds = 31556926;
  let isLocked = false;

  const targetLen = ((Date.now() / 1000 - birth) / yearSeconds).toFixed(9).length;
  ageEl.querySelectorAll('.char').forEach((el, i) => {
    if (i >= targetLen) el.remove();
  });

  startLoop();

  ageEl.addEventListener('mouseenter', () => {
    isLocked = true;
    const domChars = ageEl.querySelectorAll('.char.digit');
    domChars.forEach(el => {
      el.style.transition = '';
      el.style.transform = '';
    });
    setTimeout(() => {
      isLocked = false;
    }, 2000);
  });

  function startLoop() {
    setInterval(update, 50);
  }

  function update() {
    if (isLocked) return;
    const now = Date.now() / 1000;
    const age = (now - birth) / yearSeconds;
    const ageStr = age.toFixed(9);
    const domChars = ageEl.querySelectorAll('.char');
    const chars = ageStr.split('');

    for (let i = 0; i < domChars.length && i < chars.length; i++) {
      const domEl = domChars[i];
      const char = chars[i];
      if (domEl.classList.contains('dot')) continue;
      updateDigit(domEl, char);
    }
  }

  function updateDigit(el, newChar) {
    const bottomSpan = el.lastElementChild;
    const topSpan = el.firstElementChild;
    const currentVal = bottomSpan.textContent;

    if (currentVal !== newChar) {
      topSpan.textContent = currentVal;
      bottomSpan.textContent = newChar;
      el.style.transition = 'none';
      el.style.transform = 'translateY(0)';
      void el.offsetWidth;
      el.style.transition = 'transform 0.1s ease-out';
      el.style.transform = 'translateY(calc(-100% + 1.5rem))';
    }
  }
})();
