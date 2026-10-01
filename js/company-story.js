(() => {
  const section = document.querySelector('.company-story');
  const items = [...document.querySelectorAll('[data-story-item]')];
  const images = [...document.querySelectorAll('[data-story-image]')];
  if (!section || !items.length || !images.length) return;

  const setActive = (index) => {
    items.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex === index));
    images.forEach((image, imageIndex) => image.classList.toggle('is-active', imageIndex === index));
  };

  let ticking = false;
  const updateFromScroll = () => {
    const rect = section.getBoundingClientRect();
    const travel = section.offsetHeight - window.innerHeight;
    const progress = travel > 0 ? Math.min(1, Math.max(0, -rect.top / travel)) : 0;
    const index = Math.min(items.length - 1, Math.floor(progress * items.length));
    setActive(index);
    ticking = false;
  };
  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateFromScroll);
      ticking = true;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  updateFromScroll();
})();
