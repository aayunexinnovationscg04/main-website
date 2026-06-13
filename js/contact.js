/* ============================================================
   FUEL GUARD X - Contact Page JavaScript
   contact.js - Formspree AJAX submission & validation
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initContactForm();
  initDemoForm();
  initCTAForm();
});


function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    const name = form.querySelector('#contact-name');
    const email = form.querySelector('#contact-email');
    const message = form.querySelector('#contact-message');

    if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
      highlightEmpty(form);
      return;
    }

    if (!isValidEmail(email.value)) {
      email.style.borderColor = '#ef4444';
      email.focus();
      return;
    }

    // Submit via Formspree AJAX
    submitToFormspree(form);
  });
}


function initDemoForm() {
  const form = document.getElementById('demo-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#demo-name');
    const email = form.querySelector('#demo-email');

    if (!name.value.trim() || !email.value.trim()) {
      highlightEmpty(form);
      return;
    }

    if (!isValidEmail(email.value)) {
      email.style.borderColor = '#ef4444';
      email.focus();
      return;
    }

    // Submit via Formspree AJAX
    submitToFormspree(form);
  });
}


function initCTAForm() {
  const form = document.getElementById('cta-demo-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#cta-name');
    const email = form.querySelector('#cta-email');

    if (!name || !email) return;

    if (!name.value.trim() || !email.value.trim()) {
      highlightEmpty(form);
      return;
    }

    if (!isValidEmail(email.value)) {
      email.style.borderColor = '#ef4444';
      email.focus();
      return;
    }

    // Submit via Formspree AJAX
    submitToFormspree(form);
  });
}


function submitToFormspree(form) {
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  // Show loading state
  submitBtn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:0.5rem;">Sending...</span>';
  submitBtn.disabled = true;
  submitBtn.style.opacity = '0.7';

  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      // Show success state
      form.style.display = 'none';
      const success = form.parentElement.querySelector('.form-success');
      if (success) {
        success.classList.add('visible');
      }
    } else {
      // Handle error
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      alert('There was a problem sending your message. Please try again or email us at contact@aayunex.com');
    }
  })
  .catch(() => {
    // Handle network error
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
    submitBtn.style.opacity = '1';
    alert('Network error. Please check your connection and try again.');
  });
}


function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


function highlightEmpty(form) {
  form.querySelectorAll('.form-input, .form-textarea').forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#ef4444';
      input.addEventListener('input', function handler() {
        input.style.borderColor = '';
        input.removeEventListener('input', handler);
      });
    }
  });
}
