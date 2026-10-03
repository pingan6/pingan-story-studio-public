(() => {
  'use strict';

  // Fits each complete same-origin landing page into its fixed desktop or tablet canvas.
  function fitFullPage(frame) {
    const innerDocument = frame.contentDocument;
    if (!innerDocument) return;
    const stage = frame.parentElement;
    const scale = frame.classList.contains('desktop-frame') ? 0.5 : 0.625;

    // Updates the canvas after fonts, images, FAQ expansion, or page layout changes.
    function updateHeight() {
      const height = Math.ceil(innerDocument.body.getBoundingClientRect().height);
      frame.style.height = `${height}px`;
      stage.style.height = `${height * scale}px`;
    }

    updateHeight();
    innerDocument.fonts.ready.then(updateHeight);
    const observer = new ResizeObserver(updateHeight);
    observer.observe(innerDocument.body);
  }

  document.querySelectorAll('[data-fluid-preview]').forEach((frame) => {
    frame.addEventListener('load', () => fitFullPage(frame));
  });
})();
