// Newsletter form handler - Google Sheets integration
(function() {
  'use strict';

  // IMPORTANT: Replace this URL with your Google Apps Script Web App URL
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzPcasi4f1dN6D4rNmOYhvCBMF9QAU9PyH2YQ_d87mPalWz-AGr5CD8S5VMioKGcxR_/exec';

  const form = document.getElementById('newsletter-form');
  const messageDiv = document.getElementById('form-message');

  if (!form) return;

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form data
    const email = document.getElementById('newsletter-email').value;
    const interests = Array.from(document.querySelectorAll('input[name="interest"]:checked'))
      .map(cb => cb.value);
    const gdprConsent = document.querySelector('input[name="gdpr"]').checked;

    if (!gdprConsent) {
      showMessage('Musíte souhlasit se zpracováním osobních údajů.', 'error');
      return;
    }

    // Disable submit button
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Odesílám...';

    try {
      // Send data to Google Sheets
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Important for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          interests: interests.join(', '),
          gdprConsent: gdprConsent,
          timestamp: new Date().toISOString(),
          source: 'voltglass.cz'
        })
      });

      // Note: With no-cors mode, we can't read the response
      // So we assume success if no error was thrown
      showMessage('Děkujeme! Váš e-mail byl úspěšně přidán do odběru.', 'success');
      form.reset();

      // Track conversion (if you have analytics)
      if (typeof gtag !== 'undefined') {
        gtag('event', 'newsletter_signup', {
          'event_category': 'engagement',
          'event_label': 'newsletter'
        });
      }

    } catch (error) {
      console.error('Error:', error);
      showMessage('Omlouváme se, došlo k chybě. Zkuste to prosím později.', 'error');
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });

  function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    messageDiv.style.color = type === 'success' ? '#38bdf8' : '#f97373';
    messageDiv.style.padding = '1rem';
    messageDiv.style.borderRadius = '8px';
    messageDiv.style.background = type === 'success' 
      ? 'rgba(56, 189, 248, 0.1)' 
      : 'rgba(249, 115, 115, 0.1)';

    // Hide message after 5 seconds
    setTimeout(() => {
      messageDiv.style.display = 'none';
    }, 5000);
  }
})();
