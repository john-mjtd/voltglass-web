// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.docs-menu-toggle');
  const sidebar = document.querySelector('.docs-sidebar');
  const overlay = document.querySelector('.docs-overlay');
  
  if (menuToggle && sidebar && overlay) {
    menuToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      sidebar.classList.toggle('open');
      overlay.classList.toggle('open');
      document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
    });
    
    overlay.addEventListener('click', function() {
      sidebar.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
    
    // Close sidebar when clicking a nav link (for same-page navigation)
    const sidebarLinks = sidebar.querySelectorAll('.docs-nav a');
    sidebarLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        // Allow the link to work normally, just close the sidebar after a short delay
        setTimeout(function() {
          sidebar.classList.remove('open');
          overlay.classList.remove('open');
          document.body.style.overflow = '';
        }, 100);
      });
    });
  }
  
  // ToC scroll tracking
  const tocLinks = document.querySelectorAll('.docs-toc-list a');
  const sections = [];
  
  tocLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      const section = document.querySelector(href);
      if (section) {
        sections.push({ element: section, link: link });
      }
    }
  });
  
  if (sections.length > 0) {
    function updateActiveSection() {
      const scrollPos = window.scrollY + 100;
      
      let activeSection = sections[0];
      
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].element.offsetTop <= scrollPos) {
          activeSection = sections[i];
        }
      }
      
      tocLinks.forEach(link => link.classList.remove('active'));
      if (activeSection) {
        activeSection.link.classList.add('active');
      }
    }
    
    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection();
  }
  
  // Smooth scroll for ToC links
  tocLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.pushState(null, null, href);
        }
      }
    });
  });
});
