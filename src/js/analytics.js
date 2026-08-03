/* ============================================================
   caosdev — First-party Analytics
   Tracks page views, navigation clicks, project link clicks,
   and contact link clicks. Posts to /api/track (Vercel Function).
   ============================================================ */

(function () {
  'use strict';

  // Load Umami Analytics securely from env
  var umamiId = import.meta.env ? import.meta.env.VITE_UMAMI_WEBSITE_ID : null;
  if (umamiId && !document.querySelector('script[data-website-id]')) {
    var script = document.createElement('script');
    script.defer = true;
    script.src = 'https://cloud.umami.is/script.js';
    script.setAttribute('data-website-id', umamiId);
    document.head.appendChild(script);
  }

  var ENDPOINT = '/api/track';

  function getOrCreateId(key, storage) {
    try {
      var existing = storage.getItem(key);
      if (existing) return existing;
      var id = crypto.randomUUID();
      storage.setItem(key, id);
      return id;
    } catch (e) {
      return crypto.randomUUID();
    }
  }

  function track(eventName, metadata) {
    try {
      var visitorId = getOrCreateId('afp_visitor_id', localStorage);
      var sessionId = getOrCreateId('afp_session_id', sessionStorage);
      fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventName: eventName,
          visitorId: visitorId,
          sessionId: sessionId,
          path: window.location.pathname,
          metadata: metadata || {}
        })
      });
    } catch (e) {
      // Analytics should never break the page
    }
  }

  // Expose for external use if needed
  window.trackEvent = track;

  document.addEventListener('DOMContentLoaded', function () {

    // 1. Page view
    track('page_view', { title: document.title });

    // 2. Navigation clicks
    document.querySelectorAll('.navlinks a').forEach(function (link) {
      link.addEventListener('click', function () {
        track('nav_click', {
          label: link.textContent.trim(),
          href: link.getAttribute('href')
        });
      });
    });

    // 3. Hero CTA clicks
    document.querySelectorAll('.actions .button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        track('cta_click', {
          label: btn.textContent.trim(),
          href: btn.getAttribute('href'),
          channel: 'hero'
        });
      });
    });

    // 4. Project link clicks
    document.querySelectorAll('.project header a').forEach(function (link) {
      var project = link.closest('.project');
      var title = project ? project.querySelector('h3') : null;
      link.addEventListener('click', function () {
        track('project_link_click', {
          project: title ? title.textContent.trim() : 'unknown',
          href: link.href
        });
      });
    });

    // 5. Contact link clicks
    document.querySelectorAll('.contact-list a').forEach(function (link) {
      link.addEventListener('click', function () {
        var label = link.querySelector('small');
        track('contact_click', {
          platform: label ? label.textContent.trim() : 'unknown',
          href: link.href
        });
      });
    });

  });

})();
