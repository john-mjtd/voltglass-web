document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('.vg-nav-list a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href").slice(1);
      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();

      const headerOffset = 70;
      const rect = target.getBoundingClientRect();
      const offsetTop = window.scrollY + rect.top - headerOffset;

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });

      closeMobileNav();
    });
  });

  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const navToggle = document.querySelector(".vg-nav-toggle");
  const navList = document.querySelector(".vg-nav-list");

  function openMobileNav() {
    if (!navToggle || !navList) return;
    navToggle.classList.add("is-open");
    navList.classList.add("is-open");
  }

  function closeMobileNav() {
    if (!navToggle || !navList) return;
    navToggle.classList.remove("is-open");
    navList.classList.remove("is-open");
  }

  if (navToggle && navList) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.classList.contains("is-open");
      if (isOpen) {
        closeMobileNav();
      } else {
        openMobileNav();
      }
    });
  }

  const newsletterForm = document.getElementById("newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const emailInput = newsletterForm.querySelector("#newsletter-email");
      if (!emailInput || !emailInput.value) return;

      emailInput.blur();
      const button = newsletterForm.querySelector("button");
      const originalText = button ? button.textContent : null;

      if (button) {
        button.disabled = true;
        button.textContent = "Děkujeme za přihlášení";
      }

      setTimeout(() => {
        if (button) {
          button.disabled = false;
          button.textContent = originalText || "Odeslat";
        }
        newsletterForm.reset();
      }, 2600);
    });
  }

  const sections = document.querySelectorAll(".vg-section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  sections.forEach((section) => {
    section.classList.add("vg-section-hidden");
    observer.observe(section);
  });
});
