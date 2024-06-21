gsap.registerPlugin(ScrollTrigger);

const parallax_els = document.querySelectorAll(".parallax");
let xValue,
  yValue,
  rotateDegree = 0;

function updateHeroSection(cursorPositionX) {
  parallax_els.forEach((el) => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    let speedz = el.dataset.speedz;
    let rotateSpeed = el.dataset.rotation;

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
    rotateY(${rotateDegree * rotateSpeed}deg)
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
  // console.log(xValue, yValue, rotateDegree);

  updateHeroSection(e.clientX);
});

/* GSAP Animation */
// const hero_tl = gsap.timeline();
// hero_tl.to(".hero-section", { autoAlpha: 0, duration: 1 });

// ScrollTrigger.create({
//   animation: hero_tl,
//   trigger: ".hero-section",
//   start: "10% top",
//   end: "80% top",
//   scrub: true,
//   // pin: true,
//   // anticipatePin: 1,
//   markers: false,
// });

const story_tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".story-section",
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
  .fromTo(".story-part-1 p", { autoAlpha: 0, duration: 1, y: 200 }, { autoAlpha: 1, duration: 1, y: 0 }, 0)
  .fromTo(".story-part-1 img", { autoAlpha: 0, duration: 1, y: 40 }, { autoAlpha: 0.6, duration: 1, y: 0 }, 0)
  .to(".story-part-1 p", { autoAlpha: 0, duration: 1, y: -200 })
  .to(".story-part-1 img", { autoAlpha: 0, duration: 1, y: -40 }, "<")
  .fromTo(".story-part-2 p", { autoAlpha: 0, duration: 1, y: 200 }, { autoAlpha: 1, duration: 1, y: 0 }, 2)
  .fromTo(".story-part-2 img", { autoAlpha: 0, duration: 1, y: 80 }, { autoAlpha: 0.6, duration: 1, y: 0 }, 2)
  .to(".story-part-2 p", { autoAlpha: 0, duration: 1, y: -200 })
  .to(".story-part-2 img", { autoAlpha: 0, duration: 1, y: -80 }, "<")
  .fromTo(".story-part-3 p", { autoAlpha: 0, duration: 1, y: 200 }, { autoAlpha: 1, duration: 1, y: 0 }, 4)
  .fromTo(".story-part-3 img", { autoAlpha: 0, duration: 1, y: 80 }, { autoAlpha: 0.6, duration: 1, y: 0 }, 4)
  .to(".story-part-3 p", { autoAlpha: 0, duration: 1, y: -200 })
  .to(".story-part-3 img", { autoAlpha: 0, duration: 1, y: -80 }, "<");

const best_tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".best-section",
    start: "top bottom",
    end: "bottom 10%",
    markers: false,
    id: 'best-section'
  },
});

best_tl
.from(".best-part-1 .img", { autoAlpha: 0, duration: 1, x: 600 })
.from(".best-part-1 .text", { autoAlpha: 0, duration: 1, y: 400 }, "<")
.from(".best-part-2 .img", { autoAlpha: 0, duration: 1, x: -600 }, "<")
.from(".best-part-2 .text", { autoAlpha: 0, duration: 1, y: 400 }, "<");
