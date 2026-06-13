'use strict';

// ---- Lucide icons ----
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) lucide.createIcons();

  initNav();
  initSlider();
  initScrollReveal();
  initCounters();
  initHamburger();
});

// ---- Nav scroll effect ----
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  const handler = () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', handler, { passive: true });
  handler();
}

// ---- Mobile hamburger ----
function initHamburger() {
  const btn = document.getElementById('navHamburger');
  const mob = document.getElementById('navMobile');
  if (!btn || !mob) return;

  btn.addEventListener('click', () => {
    const open = mob.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });

  mob.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mob.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---- Hero Image Slider ----
function initSlider() {
  const slider   = document.getElementById('heroSlider');
  const dotsWrap = document.getElementById('sliderDots');
  const prevBtn  = document.getElementById('sliderPrev');
  const nextBtn  = document.getElementById('sliderNext');
  const progress = document.getElementById('sliderProgress');
  if (!slider) return;

  const slides    = Array.from(slider.querySelectorAll('.slide'));
  const INTERVAL  = 4500;
  const TICK      = 60;
  let current     = 0;
  let timer       = null;
  let fillTimer   = null;
  let fillPct     = 0;

  // Build dots
  slides.forEach((_, i) => {
    const d = document.createElement('div');
    d.className = 'slider-dot' + (i === 0 ? ' active' : '');
    d.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(d);
  });

  function getDots() { return Array.from(dotsWrap.querySelectorAll('.slider-dot')); }

  function goTo(idx) {
    slides[current].classList.remove('active');
    getDots()[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    getDots()[current].classList.add('active');
    resetProgress();
    startAuto();
  }

  function resetProgress() {
    clearInterval(fillTimer);
    fillPct = 0;
    if (progress) progress.style.width = '0%';
    fillTimer = setInterval(() => {
      fillPct += (TICK / INTERVAL) * 100;
      if (fillPct >= 100) fillPct = 100;
      if (progress) progress.style.width = fillPct + '%';
    }, TICK);
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), INTERVAL);
  }

  prevBtn && prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn && nextBtn.addEventListener('click', () => goTo(current + 1));

  // Pause on hover
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', startAuto);

  // Touch swipe
  let touchStartX = 0;
  slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  slider.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) goTo(dx < 0 ? current + 1 : current - 1);
  }, { passive: true });

  goTo(0);
}

// ---- Scroll Reveal ----
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = (entry.target.dataset.delay || 0) + (
          Array.from(entry.target.parentElement?.children || []).indexOf(entry.target) * 80
        );
        setTimeout(() => {
          entry.target.classList.add('in-view');
        }, Math.min(delay, 400));
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
}

// ---- Animated Counters ----
function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1600;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(ease * target);
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target;
      };
      requestAnimationFrame(tick);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => obs.observe(el));
}
