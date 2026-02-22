document.addEventListener('DOMContentLoaded', function() {
  setupMobileMenu();
  setupCookieBanner();
});

function setupMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!menuBtn || !mobileMenu) return;
  
  menuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('translate-x-full');
    const icon = menuBtn.querySelector('i');
    if (mobileMenu.classList.contains('translate-x-full')) {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    } else {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    }
  });
}

window.toggleMobileDropdown = function(btn) {
  const dropdown = btn.nextElementSibling;
  const icon = btn.querySelector('i');
  
  if (dropdown.classList.contains('hidden')) {
    dropdown.classList.remove('hidden');
    icon.style.transform = 'rotate(180deg)';
  } else {
    dropdown.classList.add('hidden');
    icon.style.transform = 'rotate(0deg)';
  }
};

function setupCookieBanner() {
  if (localStorage.getItem('cookiesAccepted') === 'true') return;
  
  const banner = document.getElementById('cookie-banner');
  if (!banner) return;
  
  setTimeout(function() {
    banner.classList.remove('hidden');
  }, 1000);
}

window.acceptCookies = function() {
  localStorage.setItem('cookiesAccepted', 'true');
  const banner = document.getElementById('cookie-banner');
  if (banner) banner.classList.add('hidden');
};
