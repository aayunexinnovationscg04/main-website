/* ============================================================
   FUEL GUARD X - Home Page JavaScript
   home.js
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
});


/* ============================================================
   HERO IMAGE SLIDER
   Seamless infinite forward loop:
   - All slides are cloned and appended to the end
   - Auto-advances forward only, never jumps backward
   - When clone boundary is reached, snaps silently to real position
   - Prev/Next buttons, dot pagination, touch/swipe, keyboard
============================================================ */
function initHeroSlider() {
  const track         = document.getElementById('slider-track');
  const dotsContainer = document.getElementById('slider-dots');
  const btnPrev       = document.getElementById('slider-prev');
  const btnNext       = document.getElementById('slider-next');
  const sliderEl      = document.getElementById('hero-slider');

  if (!track) return;

  const realSlides = Array.from(track.querySelectorAll('.slide'));
  const total      = realSlides.length;
  if (total === 0) return;

  /* Append clones so forward scroll can loop seamlessly */
  realSlides.forEach(s => track.appendChild(s.cloneNode(true)));

  let pos          = 0;     /* current slide index (can go beyond total into clones) */
  let timer        = null;
  let touchStartX  = 0;
  let busy         = false; /* prevent overlapping animations */

  /* --- Build dot buttons for real slides only --- */
  realSlides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.setAttribute('role', 'tab');
    dot.addEventListener('click', () => {
      stop();
      busy = false;
      setPos(i, true);
      start();
    });
    dotsContainer && dotsContainer.appendChild(dot);
  });

  function syncDots() {
    const realIdx = pos % total;
    const dots    = dotsContainer && dotsContainer.querySelectorAll('.slider-dot');
    dots && dots.forEach((d, i) => d.classList.toggle('active', i === realIdx));
  }

  function setPos(index, animate) {
    track.style.transition = animate
      ? 'transform 0.52s cubic-bezier(0.4, 0, 0.2, 1)'
      : 'none';
    track.style.transform  = `translateX(-${index * 100}%)`;
    pos = index;
    syncDots();
  }

  /* When transition ends: if we landed in the clone zone, silently snap back to the
     equivalent real slide. The two positions look identical so no visual jump occurs. */
  track.addEventListener('transitionend', () => {
    busy = false;
    if (pos >= total) {
      setPos(pos - total, false);
      /* Force a synchronous reflow so the browser registers the instant position
         change before the next transition can fire. */
      track.getBoundingClientRect();
    }
  });

  function next() {
    if (busy) return;
    busy = true;
    setPos(pos + 1, true);
  }

  function prev() {
    if (busy) return;
    busy = true;
    /* Backward: wrap to last real slide when at 0, otherwise step back */
    const target = pos <= 0 ? total - 1 : pos - 1;
    setPos(target, true);
  }

  /* --- Auto-play --- */
  function start() { timer = setInterval(next, 4000); }
  function stop()  { clearInterval(timer); timer = null; }

  start();

  /* --- Arrow buttons --- */
  if (btnPrev) btnPrev.addEventListener('click', () => { stop(); busy = false; prev(); start(); });
  if (btnNext) btnNext.addEventListener('click', () => { stop(); busy = false; next(); start(); });

  /* --- Touch / swipe --- */
  if (sliderEl) {
    sliderEl.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
      stop();
    }, { passive: true });

    sliderEl.addEventListener('touchend', e => {
      const dx = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 44) {
        busy = false;
        dx > 0 ? next() : prev();
      }
      start();
    }, { passive: true });

    /* Pause on hover (pointer devices only) */
    sliderEl.addEventListener('mouseenter', stop);
    sliderEl.addEventListener('mouseleave', start);

    /* Keyboard */
    sliderEl.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  { stop(); busy = false; prev(); start(); }
      if (e.key === 'ArrowRight') { stop(); busy = false; next(); start(); }
    });
  }
}
