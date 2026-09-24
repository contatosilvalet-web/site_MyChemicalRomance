document.addEventListener('DOMContentLoaded', () => {
  const panel = document.getElementById('accessibility-panel');
  const toggleBtn = document.getElementById('accessibility-toggle-btn');
  const closeBtn = document.getElementById('close-a11y-panel');

  toggleBtn.addEventListener('click', () => {
    panel.classList.add('active');
    panel.setAttribute('aria-hidden', 'false');
  });

  closeBtn.addEventListener('click', () => {
    panel.classList.remove('active');
    panel.setAttribute('aria-hidden', 'true');
  });

  let currentFontSize = 100;
  document.getElementById('btn-font-increase').addEventListener('click', () => {
    if (currentFontSize < 150) {
      currentFontSize += 10;
      document.documentElement.style.fontSize = `${currentFontSize}%`;
    }
  });

  document.getElementById('btn-font-decrease').addEventListener('click', () => {
    if (currentFontSize > 80) {
      currentFontSize -= 10;
      document.documentElement.style.fontSize = `${currentFontSize}%`;
    }
  });

  document.getElementById('btn-font-reset').addEventListener('click', () => {
    currentFontSize = 100;
    document.documentElement.style.fontSize = '100%';
  });

  document.getElementById('btn-high-contrast').addEventListener('click', () => {
    document.body.classList.toggle('a11y-high-contrast');
    document.body.classList.remove('a11y-monochrome', 'a11y-invert');
  });

  document.getElementById('btn-monochrome').addEventListener('click', () => {
    document.body.classList.toggle('a11y-monochrome');
    document.body.classList.remove('a11y-high-contrast', 'a11y-invert');
  });

  document.getElementById('btn-invert-colors').addEventListener('click', () => {
    document.body.classList.toggle('a11y-invert');
    document.body.classList.remove('a11y-high-contrast', 'a11y-monochrome');
  });

  const guideLine = document.getElementById('reading-guide-line');
  document.getElementById('toggle-reading-guide').addEventListener('change', (e) => {
    if (e.target.checked) {
      guideLine.classList.add('active');
      document.addEventListener('mousemove', moveReadingGuide);
    } else {
      guideLine.classList.remove('active');
      document.removeEventListener('mousemove', moveReadingGuide);
    }
  });

  function moveReadingGuide(e) {
    guideLine.style.top = `${e.clientY}px`;
  }

  document.getElementById('toggle-large-cursor').addEventListener('change', (e) => {
    document.body.classList.toggle('a11y-large-cursor', e.target.checked);
  });

  document.getElementById('toggle-dyslexia-font').addEventListener('change', (e) => {
    document.body.classList.toggle('a11y-dyslexia', e.target.checked);
  });

  let ttsActive = false;
  document.getElementById('toggle-text-to-speech').addEventListener('change', (e) => {
    ttsActive = e.target.checked;
    if (!ttsActive) window.speechSynthesis.cancel();
  });

  document.addEventListener('mouseup', () => {
    if (!ttsActive) return;
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(selectedText);
      utterance.lang = 'pt-BR';
      window.speechSynthesis.speak(utterance);
    }
  });
});