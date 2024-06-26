// 모바일에서 스크롤이 길어질 경우 하단 주소창이 사라지는 등 vh 값이 변동되는 문제 해결을 위해 처리한 부분
ScrollTrigger.config({
  autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
});
// ScrollTrigger config 설정
gsap.registerPlugin(ScrollTrigger);

const parallax_els = document.querySelectorAll(".parallax");
let xValue,
  yValue = 0;

function updateHeroSection(cursorPositionX) {
  parallax_els.forEach((el) => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    let speedz = el.dataset.speedz;

    let isInLeft =
      parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;

    let zValue =
      (cursorPositionX - parseFloat(getComputedStyle(el).left)) *
      isInLeft *
      0.1;

    el.style.transform = `
    translateX(calc(-50% + ${-xValue * speedx}px)) 
    translateY(calc(-50% + ${yValue * speedy}px)) 
    perspective(2300px) 
    translateZ(${zValue * speedz}px) 
    `;
  });
}

// 새로고침시 함수 실행하여 mousemove event 발생하지 않을시 freeze 되는 문제 해결
updateHeroSection(0);

window.addEventListener("mousemove", (e) => {
  let windowCenter = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
  xValue = e.clientX - windowCenter.x;
  yValue = e.clientY - windowCenter.y;

  rotateDegree = (xValue / windowCenter.x) * 20;

  updateHeroSection(e.clientX);
});

/* GSAP Animation */
// hero-section
const hero_tl = gsap.timeline({
  scrollTrigger: {
    // animation: hero_tl,
    trigger: "#hero-section",
    start: "10% top",
    end: "80% top",
    scrub: true,
    markers: false,
    id: "hero-section"
  },
});
hero_tl.to("#hero-section", { autoAlpha: 0, duration: 1 });

// story-section
const story_tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#story-section",
    start: "top top",
    end: "+=6000",
    scrub: true,
    pin: true,
    anticipatePin: 1,
    markers: false,
    id: "story-section",
  },
});

story_tl
  .from("#story-section", { autoAlpha: 0, duration: 1 })
  .fromTo(
    ".part-1 .text",
    { autoAlpha: 0, duration: 1, y: 100 },
    { autoAlpha: 1, duration: 1, y: 0 },
    0
  )
  .fromTo(
    ".part-1 .img",
    { autoAlpha: 0, duration: 1, y: 40 },
    { autoAlpha: 1, duration: 1, y: 0 },
    0
  )
  .to(".part-1 .text", { autoAlpha: 0, duration: 1, y: -40 })
  .to(".part-1 .img", { autoAlpha: 0, duration: 1, y: -40 }, "<")
  .fromTo(
    ".part-2 .text",
    { autoAlpha: 0, duration: 1, y: 100 },
    { autoAlpha: 1, duration: 1, y: 0 },
    2
  )
  .fromTo(
    ".part-2 .img",
    { autoAlpha: 0, duration: 1, y: 40 },
    { autoAlpha: 1, duration: 1, y: 0 },
    2
  )
  .to(".part-2 .text", { autoAlpha: 0, duration: 1, y: -40 })
  .to(".part-2 .img", { autoAlpha: 0, duration: 1, y: -40 }, "<")
  .fromTo(
    ".part-3 .text",
    { autoAlpha: 0, duration: 1, y: 100 },
    { autoAlpha: 1, duration: 1, y: 0 },
    4
  )
  .fromTo(
    ".part-3 .img",
    { autoAlpha: 0, duration: 1, y: 40 },
    { autoAlpha: 1, duration: 1, y: 0 },
    4
  )
  .to(".part-3 .text", { autoAlpha: 0, duration: 1, y: -40 })
  .to(".part-3 .img", { autoAlpha: 0, duration: 1, y: -40 }, "<")
  .to("#story-section", { autoAlpha: 0, duration: 1 }, "<");

// best-section
const best_tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#best-section",
    start: "top bottom",
    end: "+=6000",
    markers: false,
    id: "best-section",
  },
});

best_tl
  .from(".best-part-1 .img", { autoAlpha: 0, duration: 1, x: 600 })
  .from(".best-part-1 .text", { autoAlpha: 0, duration: 1, y: 400 }, "<")
  .from(".best-part-2 .img", { autoAlpha: 0, duration: 1, x: -600 }, "<")
  .from(".best-part-2 .text", { autoAlpha: 0, duration: 1, y: 400 }, "<");

// scroll down button fade out
const summary_tl = gsap.timeline({
  scrollTrigger: {
    trigger: "#summary-section",
    start: "top bottom",
    end: "bottom bottom",
    markers: false,
    scrub: true,
    id: "summary-section",
  },
});

summary_tl.to(".scroll-down", { opacity: 0 });
