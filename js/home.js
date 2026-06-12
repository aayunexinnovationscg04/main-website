/* ============================================================
   FUEL GUARD X — Home Page JavaScript
   home.js — Counter animations, dashboard mock, hero effects
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  animateCounters();
  initDashboardMock();
});


/* ============================================================
   DASHBOARD MOCK — Animated bar heights
   ============================================================ */
function initDashboardMock() {
  const bars = document.querySelectorAll('.mock-bar');
  if (!bars.length) return;

  // Generate random heights for fuel data visualization
  const heights = [65, 42, 78, 35, 90, 55, 72, 48, 83, 60, 45, 88];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        bars.forEach((bar, i) => {
          const h = heights[i % heights.length];
          setTimeout(() => {
            bar.style.height = h + '%';
          }, i * 80);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const chartEl = document.querySelector('.mock-chart-bars');
  if (chartEl) {
    observer.observe(chartEl);
  }
}
