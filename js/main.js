/* ============================================================
   FUEL GUARD X - Shared JavaScript
   main.js - Navbar, scroll, animations, theme, utilities
   Designed & developed by Harish Kumar Dwivedi
   ============================================================ */

// Flag page as loading before DOMContentLoaded so CSS skeleton kicks in
document.documentElement.classList.add('page-loading');

document.addEventListener('DOMContentLoaded', () => {
  initSkeleton();
  initThemeSwitcher();
  initNavbar();
  initScrollReveal();
  initScrollProgress();
  initSmoothScroll();
  initActiveNavLink();
  initButtonRipple();
  animateCounters();
  // Init Lucide icons (defer-loaded CDN is ready by DOMContentLoaded)
  if (typeof lucide !== 'undefined') lucide.createIcons();
});


/* ============================================================
   0. SKELETON LOADING - shimmer covers removed on window.load
   ============================================================ */
function initSkeleton() {
  const targets = document.querySelectorAll(
    '.hero-content, .hero-visual, ' +
    '.proof-item, .problem-item, .problem-stat-highlight, ' +
    '.feature-card, .feature-detail-card, ' +
    '.ach-card, .media-card, ' +
    '.ecosystem-card, ' +
    '.contact-form-panel, .contact-info-card, ' +
    '.dt-pillar, .dt-pipeline, ' +
    '.logo-strip'
  );

  targets.forEach(el => {
    const cover = document.createElement('div');
    cover.className = 'skeleton-cover';
    cover.setAttribute('aria-hidden', 'true');
    el.appendChild(cover);
  });

  function revealAll() {
    document.querySelectorAll('.skeleton-cover').forEach(cover => {
      cover.classList.add('sk-out');
      cover.addEventListener('transitionend', () => cover.remove(), { once: true });
    });
    document.documentElement.classList.remove('page-loading');
    document.documentElement.classList.add('page-loaded');
  }

  if (document.readyState === 'complete') {
    revealAll();
  } else {
    window.addEventListener('load', revealAll, { once: true });
  }
}


/* ============================================================
   1. THEME SWITCHER - dark / light only (no orange)
   ============================================================ */
function initThemeSwitcher() {
  let saved = localStorage.getItem('theme') || 'light';
  if (saved === 'orange') saved = 'light';

  applyTheme(saved);

  document.querySelectorAll('.theme-dot, .mobile-theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.dataset.theme;
      if (!t || t === 'orange') return;
      applyTheme(t);
      localStorage.setItem('theme', t);
    });
  });
}

function applyTheme(theme) {
  if (theme === 'orange') theme = 'light';
  document.documentElement.setAttribute('data-theme', theme);
  updateActiveThemeButton(theme);
}

function updateActiveThemeButton(activeTheme) {
  document.querySelectorAll('.theme-dot, .mobile-theme-btn').forEach(btn => {
    if (btn.dataset.theme === activeTheme) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}


/* ============================================================
   2. NAVBAR - scroll compact + mobile drawer
   ============================================================ */
function initNavbar() {
  const navbar   = document.querySelector('.navbar');
  const toggle   = document.querySelector('.navbar-toggle');
  const menu     = document.querySelector('.navbar-mobile-menu');
  const backdrop = document.querySelector('.navbar-mobile-backdrop');

  if (!navbar) return;

  // Scroll compact
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (!toggle || !menu) return;

  let savedScrollY = 0;

  // Prevent scroll on touchmove outside the menu (iOS Safari momentum scroll)
  const blockTouchScroll = (e) => {
    if (menu.contains(e.target)) return;
    e.preventDefault();
  };

  const openMenu = () => {
    savedScrollY = window.scrollY;
    toggle.classList.add('active');
    menu.classList.add('open');
    backdrop && backdrop.classList.add('open');

    // Compensate for scrollbar disappearing (Windows desktop — prevents layout shift)
    const scrollbarW = window.innerWidth - document.documentElement.clientWidth;
    if (scrollbarW > 0) document.body.style.paddingRight = scrollbarW + 'px';

    // Lock scroll: html overflow stops Windows mouse/trackpad/keyboard scroll;
    // body position:fixed stops iOS Safari momentum scroll
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow   = 'hidden';
    document.body.style.position   = 'fixed';
    document.body.style.top        = `-${savedScrollY}px`;
    document.body.style.left       = '0';
    document.body.style.right      = '0';

    // Extra iOS touchmove block
    document.addEventListener('touchmove', blockTouchScroll, { passive: false });
  };

  const closeMenu = () => {
    toggle.classList.remove('active');
    menu.classList.remove('open');
    backdrop && backdrop.classList.remove('open');

    document.documentElement.style.overflow = '';
    document.body.style.overflow   = '';
    document.body.style.position   = '';
    document.body.style.top        = '';
    document.body.style.left       = '';
    document.body.style.right      = '';
    document.body.style.paddingRight = '';

    document.removeEventListener('touchmove', blockTouchScroll);
    window.scrollTo(0, savedScrollY);
  };

  toggle.addEventListener('click', () => {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });

  backdrop && backdrop.addEventListener('click', closeMenu);

  const mobileClose = document.querySelector('.navbar-mobile-close');
  mobileClose && mobileClose.addEventListener('click', closeMenu);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });

  menu.querySelectorAll('.mobile-menu-nav a, .navbar-mobile-menu .btn').forEach(link => link.addEventListener('click', closeMenu));
}


/* ============================================================
   3. SCROLL PROGRESS BAR
   ============================================================ */
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress-bar';
  Object.assign(bar.style, {
    position: 'fixed',
    top: '0', left: '0', right: '0',
    height: '2.5px',
    background: 'linear-gradient(90deg, #F57320, #FF9448, #2B5EE8)',
    transformOrigin: 'left center',
    transform: 'scaleX(0)',
    zIndex: '9999',
    pointerEvents: 'none',
    transition: 'transform 0.08s linear',
  });
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const max      = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrolled / max : 0})`;
  }, { passive: true });
}


/* ============================================================
   4. SCROLL REVEAL - Intersection Observer
   ============================================================ */
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (!els.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}


/* ============================================================
   5. SMOOTH SCROLL - Anchor links
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const offset = (document.querySelector('.navbar')?.offsetHeight || 72) + 8;
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });
}


/* ============================================================
   6. ACTIVE NAV LINK
   ============================================================ */
function initActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-links a, .mobile-menu-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    if (href.split('/').pop() === currentPage) link.classList.add('active');
    else link.classList.remove('active');
  });
}


/* ============================================================
   7. BUTTON RIPPLE EFFECT
   ============================================================ */
function initButtonRipple() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.addEventListener('click', e => {
      const rect   = btn.getBoundingClientRect();
      const size   = Math.max(rect.width, rect.height) * 1.8;
      const x      = e.clientX - rect.left - size / 2;
      const y      = e.clientY - rect.top  - size / 2;
      const ripple = document.createElement('span');
      Object.assign(ripple.style, {
        position: 'absolute',
        width:    size + 'px',
        height:   size + 'px',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.20)',
        top:  y + 'px',
        left: x + 'px',
        transform: 'scale(0)',
        animation: 'rippleExpand 0.55s ease-out forwards',
        pointerEvents: 'none',
      });
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}


/* ============================================================
   8. ANIMATED COUNTER
   ============================================================ */
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el       = entry.target;
      const target   = parseFloat(el.dataset.count);
      const suffix   = el.dataset.suffix  || '';
      const prefix   = el.dataset.prefix  || '';
      const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
      const duration = 2000;
      const start    = performance.now();

      const update = now => {
        const eased  = 1 - Math.pow(1 - Math.min((now - start) / duration, 1), 3);
        el.textContent = prefix + (eased * target).toFixed(decimals) + suffix;
        if (eased < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.3 });

  counters.forEach(el => observer.observe(el));
}

window.animateCounters = animateCounters;
