/* ============================================================
   caosdev — Main Script
   Handles: navbar (mobile menu, scroll spy, blur on scroll),
   project filters, scroll reveal, footer year
   ============================================================ */

(function () {
  'use strict';

  /* ——— Mobile menu (hamburger → X) ——— */
  var toggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  function closeMenu() {
    if (!navLinks) return;
    navLinks.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    // Close menu if window resizes past mobile breakpoint
    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) closeMenu();
    });
  }


  /* ——— Navbar blur on scroll & progress bar ——— */
  var mainNav = document.getElementById('mainNav');
  var progressBar = document.getElementById('scrollProgress');
  var backToTop = document.getElementById('backToTop');

  /* ——— Scroll spy — highlights the nav link for the current section ——— */
  var navAnchors = document.querySelectorAll('.navlinks a');
  var sections = document.querySelectorAll('section[id]');

  var scrollFrame = 0;

  function setActiveSection(current) {
    navAnchors.forEach(function (anchor) {
      anchor.classList.toggle('active', anchor.getAttribute('href') === '#' + current);
    });
  }

  function updateScrollUi() {
    scrollFrame = 0;
    var winScroll = window.scrollY || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = height > 0 ? (winScroll / height) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = scrolled + '%';
    }

    // Blur intensifies after scrolling past 60px
    if (mainNav) {
      mainNav.classList.toggle('scrolled', winScroll > 60);
    }

    if (backToTop) {
      backToTop.classList.toggle('is-visible', winScroll > 420);
    }

    if (winScroll + window.innerHeight >= document.documentElement.scrollHeight - 50) {
      var lastSection = sections[sections.length - 1];
      if (lastSection) setActiveSection(lastSection.id);
    }
  }

  function onScroll() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScrollUi);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  updateScrollUi();

  if ('IntersectionObserver' in window) {
    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-120px 0px -65% 0px', threshold: 0 });
    sections.forEach(function (section) { sectionObserver.observe(section); });
  }

  /* Defer the expensive WebGL/Three.js chunk until critical content is painted. */
  var eyeHost = document.getElementById('asciiEye');
  var desktopEye = window.matchMedia('(min-width: 901px)');
  var eyeLoading = false;
  if (eyeHost) {
    var loadEye = function () {
      if (!desktopEye.matches || eyeLoading || eyeHost.dataset.ready === 'true') return;
      eyeLoading = true;
      import('./ascii-eye.js').then(function (module) {
        module.initAsciiEye(eyeHost);
      }).catch(function () {
        eyeLoading = false;
        eyeHost.classList.add('eye-unavailable');
      });
    };
    window.addEventListener('load', function () {
      if (desktopEye.matches) {
        if ('requestIdleCallback' in window) requestIdleCallback(loadEye, { timeout: 3000 });
        else setTimeout(loadEye, 1200);
      }
    }, { once: true });
    if (desktopEye.addEventListener) desktopEye.addEventListener('change', loadEye);
  }


  /* ——— Project filters & card click ——— */
  var filters = document.querySelectorAll('.filter');
  var projects = document.querySelectorAll('.project');
  var emptyMessage = document.getElementById('empty-message');

  projects.forEach(function (project) {
    var githubUrl = project.dataset.github;
    if (githubUrl) {
      project.style.cursor = 'pointer';
      project.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        window.open(githubUrl, '_blank', 'noopener,noreferrer');
      });
    }
  });

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var selected = btn.dataset.filter;
      var visible = 0;

      filters.forEach(function (f) {
        f.classList.toggle('active', f === btn);
      });

      projects.forEach(function (project) {
        var tags = project.dataset.tags || '';
        var matches = selected === 'all' || tags.indexOf(selected) !== -1;
        project.classList.toggle('hidden', !matches);
        if (matches) visible++;
      });

      if (emptyMessage) {
        emptyMessage.hidden = visible > 0;
      }
    });
  });


  /* ——— Scroll reveal ——— */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
  }


  /* ——— Terminal window controls ——— */
  document.querySelectorAll('.terminal-controls').forEach(function (controls) {
    var win = controls.closest('.terminal, .lab-window');
    if (!win) return;

    var body = win.querySelector('.terminal-body, .tech-card-body, pre');
    var closeBtn = controls.querySelector('.close');
    var minBtn = controls.querySelector('.min');
    var maxBtn = controls.querySelector('.max');

    // Close / reset
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (body) {
          body.style.display = body.style.display === 'none' ? '' : 'none';
        }
      });
    }

    // Minimize / collapse
    if (minBtn) {
      minBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (body) {
          body.style.display = body.style.display === 'none' ? '' : 'none';
        }
      });
    }

    // Maximize / restore
    if (maxBtn) {
      maxBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (body) {
          body.style.display = '';
        }
      });
    }
  });


  /* ——— Footer year ——— */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
