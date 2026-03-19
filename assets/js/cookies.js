// Cookie Consent Management
(function() {
  'use strict';

  const COOKIE_NAME = 'voltglass_cookie_consent';
  const COOKIE_EXPIRY_DAYS = 365;

  // Check if consent already given
  function getCookieConsent() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === COOKIE_NAME) {
        return value;
      }
    }
    return null;
  }

  // Set cookie consent
  function setCookieConsent(value) {
    const date = new Date();
    date.setTime(date.getTime() + (COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + date.toUTCString();
    document.cookie = `${COOKIE_NAME}=${value};${expires};path=/;SameSite=Lax`;
  }

  // Show cookie banner
  function showCookieBanner() {
    const banner = document.getElementById('cookie-consent');
    if (banner) {
      banner.style.display = 'block';
    }
  }

  // Hide cookie banner
  function hideCookieBanner() {
    const banner = document.getElementById('cookie-consent');
    if (banner) {
      banner.style.display = 'none';
    }
  }

  // Initialize analytics if consent was given
  function initAnalytics() {
    console.log('Analytics initialized');
  
    // Google Analytics - Replace G-XXXXXXXXXX with your actual Measurement ID
    if (typeof gtag !== 'undefined') {
      gtag('config', 'G-D1SW8VBKFV', {
        'anonymize_ip': true,
        'cookie_flags': 'SameSite=None;Secure'
      });
      console.log('Google Analytics configured');
    }
  }

  // Handle accept button
  function handleAccept() {
    setCookieConsent('accepted');
    initAnalytics();
    hideCookieBanner();
  }

  // Handle reject button
  function handleReject() {
    setCookieConsent('rejected');
    hideCookieBanner();
  }

  // Handle settings button (you can expand this to show detailed settings)
  function handleSettings() {
    alert('Nastavení cookies bude dostupné v plné verzi webu. Prozatím můžete přijmout vše nebo odmítnout volitelné cookies.');
  }

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', function() {
    const consent = getCookieConsent();

    if (consent === null) {
      // No consent given yet, show banner
      showCookieBanner();
    } else if (consent === 'accepted') {
      // Consent already given, initialize analytics
      initAnalytics();
    }

    // Attach event listeners
    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    const settingsBtn = document.getElementById('cookie-settings');

    if (acceptBtn) {
      acceptBtn.addEventListener('click', handleAccept);
    }

    if (rejectBtn) {
      rejectBtn.addEventListener('click', handleReject);
    }

    if (settingsBtn) {
      settingsBtn.addEventListener('click', handleSettings);
    }
  });
})();
