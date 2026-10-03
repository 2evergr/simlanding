(() => {
  const carousel = document.querySelector('.product-carousel');
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll('[data-product-slide]')];
  const dots = [...carousel.querySelectorAll('[data-product-dot]')];
  const controls = carousel.querySelector('.product-carousel-controls');
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (slides.length < 2 || slides.length !== dots.length || !controls) return;

  let current = 0;
  let timer;
  let inView = false;
  let hovered = false;

  const show = (index) => {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const active = slideIndex === current;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
    });
    dots.forEach((dot, dotIndex) => {
      if (dotIndex === current) dot.setAttribute('aria-current', 'true');
      else dot.removeAttribute('aria-current');
    });
  };

  const stop = () => {
    window.clearInterval(timer);
    timer = undefined;
  };

  const start = () => {
    stop();
    if (inView && !document.hidden && !hovered && !carousel.contains(document.activeElement) && !motionPreference.matches) {
      timer = window.setInterval(() => show(current + 1), 5000);
    }
  };

  controls.hidden = false;
  carousel.querySelector('[data-product-prev]').addEventListener('click', () => {
    show(current - 1);
    start();
  });
  carousel.querySelector('[data-product-next]').addEventListener('click', () => {
    show(current + 1);
    start();
  });
  dots.forEach((dot, index) => dot.addEventListener('click', () => {
    show(index);
    start();
  }));

  carousel.addEventListener('mouseenter', () => { hovered = true; stop(); });
  carousel.addEventListener('mouseleave', () => { hovered = false; start(); });
  carousel.addEventListener('focusin', stop);
  carousel.addEventListener('focusout', () => window.requestAnimationFrame(start));
  document.addEventListener('visibilitychange', start);
  motionPreference.addEventListener('change', start);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      start();
    }, { threshold: 0.25 });
    observer.observe(carousel);
  } else {
    inView = true;
    start();
  }
})();
