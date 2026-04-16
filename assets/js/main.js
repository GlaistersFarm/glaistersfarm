/* ============================================================
   GLAISTERS FARM — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ----- Mobile navigation -------------------------------- */
  const toggle = document.querySelector('.nav__toggle');
  const navLinks = document.querySelector('.nav__links');

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
      const bars = toggle.querySelectorAll('span');
      if (open) {
        bars[0].style.transform = 'translateY(7px) rotate(45deg)';
        bars[1].style.opacity = '0';
        bars[2].style.transform = 'translateY(-7px) rotate(-45deg)';
      } else {
        bars[0].style.transform = '';
        bars[1].style.opacity = '';
        bars[2].style.transform = '';
      }
    });

    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.querySelectorAll('span').forEach(b => {
          b.style.transform = '';
          b.style.opacity = '';
        });
      }
    });
  }

  /* ----- Sticky header ------------------------------------ */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ----- Hero background subtle pan ---------------------- */
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    heroBg.classList.add('loaded');
  }

  /* ----- Gallery lightbox --------------------------------- */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lbImg     = lightbox.querySelector('.lightbox__img');
    const lbClose   = lightbox.querySelector('.lightbox__close');
    const lbPrev    = lightbox.querySelector('.lightbox__prev');
    const lbNext    = lightbox.querySelector('.lightbox__next');
    const lbCounter = lightbox.querySelector('.lightbox__counter');

    let gallery = [];
    let current = 0;
    let triggerEl = null;

    const focusableSelectors = 'button:not([disabled]), [tabindex]:not([tabindex="-1"])';

    function getFocusable() {
      return Array.from(lightbox.querySelectorAll(focusableSelectors));
    }

    function buildGallery() {
      gallery = Array.from(document.querySelectorAll('[data-lightbox]')).map(el => ({
        src: el.dataset.lightbox || el.querySelector('img')?.src || el.src,
        alt: el.dataset.alt || el.querySelector('img')?.alt || ''
      }));
    }

    function open(index, trigger) {
      if (!gallery.length) buildGallery();
      current = index;
      triggerEl = trigger || null;
      show();
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
      lbClose.focus();
    }

    function close() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
      if (triggerEl) { triggerEl.focus(); triggerEl = null; }
    }

    function show() {
      const item = gallery[current];
      if (!item) return;
      lbImg.src = item.src;
      lbImg.alt = item.alt;
      if (lbCounter) lbCounter.textContent = `${current + 1} / ${gallery.length}`;
    }

    function prev() { current = (current - 1 + gallery.length) % gallery.length; show(); }
    function next() { current = (current + 1) % gallery.length; show(); }

    function initTriggers() {
      document.querySelectorAll('[data-lightbox]').forEach((el, i) => {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          if (!gallery.length) buildGallery();
          open(i, el);
        });
      });
    }

    lbClose.addEventListener('click', close);
    lbPrev.addEventListener('click', prev);
    lbNext.addEventListener('click', next);
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape')    { close(); return; }
      if (e.key === 'ArrowLeft') { prev(); return; }
      if (e.key === 'ArrowRight'){ next(); return; }
      if (e.key === 'Tab') {
        const focusable = getFocusable();
        if (!focusable.length) { e.preventDefault(); return; }
        const first = focusable[0];
        const last  = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) { e.preventDefault(); last.focus(); }
        } else {
          if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
        }
      }
    });

    let touchStartX = 0;
    lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
    }, { passive: true });

    initTriggers();
  }

  /* ----- Active nav link ---------------------------------- */
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  /* ----- Fade-in on scroll -------------------------------- */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

})();
