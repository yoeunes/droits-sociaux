/**
 * Main JavaScript entry point
 * Compiled by Vite with HMR support
 */

// Import CSS (for Vite to process)
import '../css/main.css';

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  setupMobileMenu();
  setupCookieBanner();
  setupScrollAnimations();
  setupSmoothScroll();
});

/**
 * Mobile menu functionality
 */
function setupMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!menuBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('translate-x-0');
    mobileMenu.classList.add('translate-x-full');
    document.body.style.overflow = '';
  }

  menuBtn.addEventListener('click', openMenu);

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Close menu when clicking on a link
  const menuLinks = mobileMenu.querySelectorAll('a');
  menuLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu on escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('translate-x-full')) {
      closeMenu();
    }
  });
}

/**
 * Mobile dropdown toggle (exposed globally)
 */
window.toggleMobileDropdown = function(btn) {
  const dropdown = btn.nextElementSibling;
  const icon = btn.querySelector('.fa-chevron-down');

  if (dropdown.classList.contains('hidden')) {
    dropdown.classList.remove('hidden');
    if (icon) icon.classList.add('rotate-180');
  } else {
    dropdown.classList.add('hidden');
    if (icon) icon.classList.remove('rotate-180');
  }
};

/**
 * Cookie banner functionality
 */
function setupCookieBanner() {
  if (localStorage.getItem('cookiesAccepted') === 'true') return;

  const banner = document.getElementById('cookie-banner');
  if (!banner) return;

  setTimeout(function() {
    banner.classList.remove('hidden');
  }, 1500);
}

window.acceptCookies = function() {
  localStorage.setItem('cookiesAccepted', 'true');
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.classList.add('hidden');
};

/**
 * Scroll-triggered animations
 */
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.classList.add('animate-fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe cards and sections for animation
  const elements = document.querySelectorAll('.card, .feature-card, .news-card');
  elements.forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

/**
 * Smooth scroll for anchor links
 */
function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== '#') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

// HMR support for development
if (import.meta.hot) {
  import.meta.hot.accept();
}
