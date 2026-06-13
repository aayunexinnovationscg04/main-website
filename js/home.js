/* ============================================================
   FUEL GUARD X — Home Page JavaScript
   home.js
============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  animateCounters();
  initHeroParticles();
  initHeroChartBars();
  initHeroBarLoop();
});


/* ============================================================
   HERO PARTICLES — orange + blue brand colors
============================================================ */
function initHeroParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const container = document.createElement('div');
  container.className = 'hero-particles-layer';
  Object.assign(container.style, {
    position: 'absolute',
    inset: '0',
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: '0',
  });

  const count = window.innerWidth < 600 ? 10 : 24;

  for (let i = 0; i < count; i++) {
    const p    = document.createElement('span');
    const size = (Math.random() * 3.5 + 1.5).toFixed(1);
    const x    = (Math.random() * 95).toFixed(1);
    const y    = (Math.random() * 90).toFixed(1);
    const dur  = (Math.random() * 10 + 8).toFixed(1);
    const del  = (Math.random() * 8).toFixed(1);
    const op   = (Math.random() * 0.3 + 0.06).toFixed(2);

    /* Randomly orange or blue — brand colors */
    const r   = Math.random();
    const hue = r < 0.55
      ? '245, 115, 32'   /* orange flame */
      : '43, 94, 232';   /* blue ring    */

    Object.assign(p.style, {
      position:     'absolute',
      left:         x + '%',
      top:          y + '%',
      width:        size + 'px',
      height:       size + 'px',
      borderRadius: '50%',
      background:   `rgba(${hue}, ${op})`,
      animation:    `particleFloat ${dur}s ease-in-out ${del}s infinite`,
      willChange:   'transform',
    });
    container.appendChild(p);
  }

  /* Decorative ring */
  const ring = document.createElement('div');
  Object.assign(ring.style, {
    position:     'absolute',
    top:          '-160px',
    right:        '-160px',
    width:        '420px',
    height:       '420px',
    borderRadius: '50%',
    border:       '1px solid rgba(245, 115, 32, 0.07)',
    pointerEvents:'none',
    animation:    'ringPulse 7s ease-in-out infinite',
  });
  container.appendChild(ring);

  hero.insertBefore(container, hero.firstChild);
}


/* ============================================================
   HERO CHART BARS — animate from 0 on viewport entry
============================================================ */
function initHeroChartBars() {
  const chart = document.querySelector('#hero-chart-bars');
  if (!chart) return;

  const bars = chart.querySelectorAll('.mcb');
  const targets = [];

  bars.forEach(b => {
    const raw   = b.getAttribute('style') || '';
    const match = raw.match(/--h:\s*([\d.]+%)/);
    targets.push(match ? match[1] : '50%');
    b.style.height = '0%';
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      bars.forEach((b, i) => {
        setTimeout(() => {
          b.style.transition = `height ${0.45 + i * 0.05}s cubic-bezier(0.4, 0, 0.2, 1)`;
          b.style.height     = targets[i];
        }, 200 + i * 55);
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  observer.observe(chart);
}


/* ============================================================
   HERO CHART — subtle shimmer loop every 3.5s
============================================================ */
function initHeroBarLoop() {
  const chart = document.querySelector('#hero-chart-bars');
  if (!chart) return;

  const bases = [42, 68, 50, 82, 58, 72, 45, 88, 60, 76, 48, 92];

  function shimmer() {
    const bars = chart.querySelectorAll('.mcb');
    bars.forEach((b, i) => {
      const jitter = bases[i] + (Math.random() * 14 - 7);
      const h      = Math.min(95, Math.max(15, jitter)).toFixed(0);
      b.style.transition = 'height 1.4s ease-in-out';
      b.style.height     = h + '%';
    });
  }

  setTimeout(() => {
    shimmer();
    setInterval(shimmer, 3500);
  }, 3200);
}
