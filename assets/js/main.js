// MAIN JAVASCRIPT FILE

// MOBILE MENU TOGGLE
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenuToggle = document.querySelector('[data-landingsite-mobile-menu-toggle]');
  const mobileMenu = document.querySelector('[data-landingsite-mobile-menu]');
  const toggleIcon = mobileMenuToggle ? mobileMenuToggle.querySelector('i') : null;

  function openMenu() {
    mobileMenu.classList.remove('hidden');
    if (toggleIcon) {
      toggleIcon.classList.remove('fa-bars');
      toggleIcon.classList.add('fa-times');
    }
  }

  function closeMenu() {
    mobileMenu.classList.add('hidden');
    if (toggleIcon) {
      toggleIcon.classList.remove('fa-times');
      toggleIcon.classList.add('fa-bars');
    }
  }

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      if (mobileMenu.classList.contains('hidden')) {
        openMenu();
      } else {
        closeMenu();
      }
    });

    // Close menu when any link is clicked
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      const header = document.getElementById('global-header');
      if (header && !header.contains(e.target)) {
        closeMenu();
      }
    });

    // Close on resize to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024) {
        closeMenu();
      }
    });
  }
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = document.getElementById('global-header')?.offsetHeight || 80;
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// IMAGE OPTIMIZATION ON LOAD
window.addEventListener('load', () => {
  document.querySelectorAll('img').forEach(img => {
    if (!img.style.height || img.style.height === 'auto') {
      img.style.maxWidth = '100%';
    }
  });
});

console.log('✅ OC Business Center - Site initialized successfully!');
