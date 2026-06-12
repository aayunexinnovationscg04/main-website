/* ============================================================
   FUEL GUARD X — Shared JavaScript
   main.js — Navbar, scroll animations, global utilities
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  console.log('Designed and developed by Harish Kumar Dwivedi');
  initNavbar();
  initScrollReveal();
  initSmoothScroll();
  initActiveNavLink();
  initThemeSwitcher();
});


/* ============================================================
   1. NAVBAR — Scroll background + Mobile toggle
   ============================================================ */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const toggle = document.querySelector('.navbar-toggle');
  const mobileMenu = document.querySelector('.navbar-mobile-menu');

  if (!navbar) return;

  // Scroll background
  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Initial check

  // Mobile toggle with backdrop
  if (toggle && mobileMenu) {
    // Create backdrop element
    let backdrop = document.querySelector('.navbar-mobile-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'navbar-mobile-backdrop';
      document.body.appendChild(backdrop);
    }

    const openMenu = () => {
      toggle.classList.add('active');
      mobileMenu.classList.add('open');
      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
      toggle.classList.remove('active');
      mobileMenu.classList.remove('open');
      backdrop.classList.remove('open');
      document.body.style.overflow = '';
    };

    toggle.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close on backdrop click
    backdrop.addEventListener('click', closeMenu);

    // Close button inside mobile menu
    const mobileClose = document.querySelector('.navbar-mobile-close');
    if (mobileClose) {
      mobileClose.addEventListener('click', closeMenu);
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
        closeMenu();
      }
    });

    // Close mobile menu when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }
}


/* ============================================================
   2. SCROLL REVEAL — Intersection Observer
   ============================================================ */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}


/* ============================================================
   3. SMOOTH SCROLL — Anchor links
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 72;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}


/* ============================================================
   4. ACTIVE NAV LINK — Highlight current page
   ============================================================ */
function initActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.navbar-links a, .navbar-mobile-menu a').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const linkPage = href.split('/').pop();
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}


/* ============================================================
   5. ANIMATED COUNTER — Utility for stats
   ============================================================ */
function animateCounters() {
  const counters = document.querySelectorAll('[data-count]');

  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const prefix = el.dataset.prefix || '';
        const decimals = el.dataset.decimals ? parseInt(el.dataset.decimals) : 0;
        const duration = 2000;
        const start = performance.now();

        function updateCount(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);

          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = eased * target;

          el.textContent = prefix + current.toFixed(decimals) + suffix;

          if (progress < 1) {
            requestAnimationFrame(updateCount);
          }
        }

        requestAnimationFrame(updateCount);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.3 });

  counters.forEach(el => observer.observe(el));
}

// Make available globally
window.animateCounters = animateCounters;


/* ============================================================
   6. THEME SWITCHER — Dark, Orange, Light themes
   ============================================================ */
function initThemeSwitcher() {
  // Load saved theme or default to light (blue-style theme)
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Update active button
  updateActiveThemeButton(savedTheme);
  
  // Add click handlers to theme dots (navbar version)
  document.querySelectorAll('.theme-dot').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      updateActiveThemeButton(theme);
    });
  });
  
  // Add click handlers to mobile theme buttons
  document.querySelectorAll('.mobile-theme-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.theme;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      updateActiveThemeButton(theme);
    });
  });
}

function updateActiveThemeButton(activeTheme) {
  // Update navbar theme dots
  document.querySelectorAll('.theme-dot').forEach(btn => {
    if (btn.dataset.theme === activeTheme) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Update mobile theme buttons
  document.querySelectorAll('.mobile-theme-btn').forEach(btn => {
    if (btn.dataset.theme === activeTheme) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}
