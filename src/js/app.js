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

  /* ——— Scroll spy — highlights the nav link for the current section ——— */
  var navAnchors = document.querySelectorAll('.navlinks a');
  var sections = document.querySelectorAll('section[id]');

  function onScroll() {
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

    // Scroll spy: find current section
    var current = '';
    var scrollPosition = window.scrollY || document.documentElement.scrollTop;
    var windowHeight = window.innerHeight;
    var documentHeight = document.documentElement.scrollHeight;

    // Check if scrolled to bottom
    if (scrollPosition + windowHeight >= documentHeight - 50) {
      var lastSection = sections[sections.length - 1];
      if (lastSection) current = lastSection.id;
    } else {
      sections.forEach(function (section) {
        var rect = section.getBoundingClientRect();
        if (rect.top <= 180 && rect.bottom >= 180) {
          current = section.id;
        }
      });
    }

    navAnchors.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }

  window.addEventListener('scroll', onScroll);
  // Run once on load to set initial state
  onScroll();


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
