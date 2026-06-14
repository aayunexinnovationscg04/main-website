/* ============================================================
   FUEL GUARD X - Home Page JavaScript
   home.js
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
});


/* ============================================================
   HERO IMAGE SLIDER
   - Auto-advances every 4 seconds
   - Prev / Next buttons
   - Dot pagination
   - Touch / swipe support (mobile)
   - Pauses on hover (desktop)
============================================================ */
function initHeroSlider() {
  const track         = document.getElementById('slider-track');
  const dotsContainer = document.getElementById('slider-dots');
  const btnPrev       = document.getElementById('slider-prev');
  const btnNext       = document.getElementById('slider-next');
  const sliderEl      = document.getElementById('hero-slider');

  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.slide'));
  const total  = slides.length;
  if (total === 0) return;

  let current    = 0;
  let timer      = null;
  let touchStart = 0;

  /* --- Build dot buttons --- */
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className    = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.setAttribute('role', 'tab');
    dot.addEventListener('click', () => { stop(); goTo(i); start(); });
    dotsContainer && dotsContainer.appendChild(dot);
  });

  /* --- Core navigation --- */
  function goTo(index) {
    current = ((index % total) + total) % total;
    track.style.transform = 'translateX(-' + (current * 100) + '%)';
    const dots = dotsContainer && dotsContainer.querySelectorAll('.slider-dot');
    dots && dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  /* --- Auto-play --- */
  function start() { timer = setInterval(next, 4000); }
  function stop()  { clearInterval(timer); timer = null; }

  start();

  /* --- Arrow buttons --- */
  if (btnPrev) btnPrev.addEventListener('click', () => { stop(); prev(); start(); });
  if (btnNext) btnNext.addEventListener('click', () => { stop(); next(); start(); });

  /* --- Touch / swipe --- */
  if (sliderEl) {
    sliderEl.addEventListener('touchstart', e => {
      touchStart = e.touches[0].clientX;
      stop();
    }, { passive: true });

    sliderEl.addEventListener('touchend', e => {
      const diff = touchStart - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 44) {
        diff > 0 ? next() : prev();
      }
      start();
    }, { passive: true });

    /* Pause auto-play while hovering (pointer devices only) */
    sliderEl.addEventListener('mouseenter', stop);
    sliderEl.addEventListener('mouseleave', start);
  }

  /* --- Keyboard accessibility --- */
  if (sliderEl) {
    sliderEl.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  { stop(); prev(); start(); }
      if (e.key === 'ArrowRight') { stop(); next(); start(); }
    });
  }
}
