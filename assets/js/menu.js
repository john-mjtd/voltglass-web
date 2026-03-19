/**
 * VoltGlass - Menu & Scroll to Top Functionality
 */

(function() {
  'use strict';

  // === SIDEBAR MENU ===
  
  const menuToggle = document.getElementById('menu-toggle');
  const floatingMenuToggle = document.getElementById('floating-menu-toggle');
  const sidebarMenu = document.getElementById('sidebar-menu');
  const sidebarClose = document.getElementById('sidebar-close');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarLinks = document.querySelectorAll('.vg-sidebar-link');

  // Open sidebar menu
  function openSidebar() {
    sidebarMenu.classList.add('is-open');
    sidebarOverlay.classList.add('is-visible');
    document.body.style.overflow = 'hidden';
  }

  // Close sidebar menu
  function closeSidebar() {
    sidebarMenu.classList.remove('is-open');
    sidebarOverlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  // Toggle sidebar - header button
  if (menuToggle) {
    menuToggle.addEventListener('click', openSidebar);
  }

  // Toggle sidebar - floating button
  if (floatingMenuToggle) {
    floatingMenuToggle.addEventListener('click', openSidebar);
  }

  // Close sidebar
  if (sidebarClose) {
    sidebarClose.addEventListener('click', closeSidebar);
  }

  // Close sidebar when clicking overlay
  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // Close sidebar when clicking a link
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function() {
      closeSidebar();
      
      // Update active state
      sidebarLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Close sidebar on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && sidebarMenu.classList.contains('is-open')) {
      closeSidebar();
    }
  });

  // === SCROLL TO TOP BUTTON ===
  
  const scrollTopBtn = document.getElementById('scroll-top');
  
  // Show/hide scroll to top button and floating menu toggle based on scroll position
  function handleScrollButtons() {
    if (window.pageYOffset > 300) {
      if (scrollTopBtn) scrollTopBtn.classList.add('is-visible');
      if (floatingMenuToggle) floatingMenuToggle.classList.add('is-visible');
    } else {
      if (scrollTopBtn) scrollTopBtn.classList.remove('is-visible');
      if (floatingMenuToggle) floatingMenuToggle.classList.remove('is-visible');
    }
  }

  // Scroll to top when button is clicked
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Listen to scroll events
  window.addEventListener('scroll', handleScrollButtons);
  
  // Initial check
  handleScrollButtons();

  // === ACTIVE SECTION HIGHLIGHTING ===
  
  // Highlight active section in sidebar menu based on scroll position
  function updateActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.pageYOffset + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        sidebarLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  // Listen to scroll events for active section highlighting
  window.addEventListener('scroll', updateActiveSection);
  
  // Initial check
  updateActiveSection();

})();
