/* Sameeul Khondoker Jisan — Portfolio scripts */
(function () {
  'use strict';

  const doc = document.documentElement;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const supportsIO = 'IntersectionObserver' in window;

  /* matchMedia change listener — Safari < 14 only has addListener */
  function onMediaChange(mq, fn) {
    if (mq.addEventListener) mq.addEventListener('change', fn);
    else if (mq.addListener) mq.addListener(fn);
  }

  /* localStorage throws in some private-browsing modes */
  function readTheme() { try { return localStorage.getItem('theme'); } catch (e) { return null; } }
  function saveTheme(t) { try { localStorage.setItem('theme', t); } catch (e) {} }

  /* Dynamic year */
  const yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();

  /* ── Theme toggle — icons are swapped by CSS via [data-theme] ── */
  const themeBtn  = document.getElementById('themeToggle');
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  function applyTheme(t) {
    doc.setAttribute('data-theme', t);
    if (metaTheme) metaTheme.setAttribute('content', t === 'light' ? '#f7f6f2' : '#0a0f0d');
    if (themeBtn) themeBtn.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
  applyTheme(doc.getAttribute('data-theme') === 'light' ? 'light' : 'dark');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const next = doc.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      saveTheme(next);
    });
  }
  /* Follow the OS theme live — until the visitor picks one themselves */
  onMediaChange(window.matchMedia('(prefers-color-scheme: light)'), e => {
    const stored = readTheme();
    if (stored !== 'light' && stored !== 'dark') applyTheme(e.matches ? 'light' : 'dark');
  });

  /* ── Mobile menu ── */
  const menuBtn = document.getElementById('menuToggle');
  const menu    = document.getElementById('mobileNav');
  function isMenuOpen() { return menu.classList.contains('is-open'); }
  function setMenu(open) {
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', () => setMenu(!isMenuOpen()));
    menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && isMenuOpen()) { setMenu(false); menuBtn.focus(); }
    });
    document.addEventListener('click', e => {
      if (isMenuOpen() && !menu.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
    });
    /* Rotating a tablet to landscape can reveal the desktop nav — close the menu */
    onMediaChange(window.matchMedia('(min-width: 1081px)'), e => { if (e.matches) setMenu(false); });
  }

  /* ── Header elevation + back-to-top (one rAF-batched scroll handler) ── */
  const header = document.getElementById('siteHeader');
  const toTop  = document.getElementById('toTop');
  let scrollQueued = false;
  function onScroll() {
    scrollQueued = false;
    const y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle('is-scrolled', y > 12);
    if (toTop) {
      /* Hide near the very bottom so it never sits on top of the footer icons */
      const nearBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 140;
      toTop.classList.toggle('is-visible', y > 500 && !nearBottom);
    }
  }
  window.addEventListener('scroll', () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(onScroll);
  }, { passive: true });
  onScroll();
  if (toTop) {
    toTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }

  /* ── Scroll reveal — animate once ── */
  const revealEls = document.querySelectorAll('.reveal');
  if (!supportsIO || reduceMotion) {
    revealEls.forEach(el => el.classList.add('is-visible'));
  } else {
    const revealIO = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => revealIO.observe(el));
  }

  /* ── Active nav link — a thin band across the middle of the viewport, so
     even sections taller than the screen register as "current" ── */
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu nav > a[href^="#"]');
  if (supportsIO && navLinks.length) {
    const navIO = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const hash = '#' + e.target.id;
        navLinks.forEach(l => l.classList.toggle('is-active', l.getAttribute('href') === hash));
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(s => navIO.observe(s));
  }

  /* ── Hero snapshot: grow the impact bars + count up the KPIs ── */
  const panel = document.getElementById('heroPanel');
  function formatNum(n, decimals) {
    return n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  }
  function countUp(el) {
    const target   = parseFloat(el.dataset.count);
    const decimals = parseInt(el.dataset.decimals || '0', 10);
    const suffix   = el.dataset.suffix || '';
    const duration = 1300;
    const start    = performance.now();
    function tick(now) {
      let t = Math.min((now - start) / duration, 1);
      t = 1 - Math.pow(1 - t, 3); /* ease-out cubic */
      el.textContent = formatNum(target * t, decimals) + suffix;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = formatNum(target, decimals) + suffix;
    }
    requestAnimationFrame(tick);
  }
  function startPanel() {
    if (!panel || panel.classList.contains('is-in')) return;
    panel.classList.add('is-in');
    /* The markup already holds the final values — reduced-motion visitors keep them */
    if (!reduceMotion) panel.querySelectorAll('[data-count]').forEach(countUp);
  }
  if (panel) {
    if (!supportsIO || reduceMotion) startPanel();
    else {
      const panelIO = new IntersectionObserver((entries, obs) => {
        if (entries.some(e => e.isIntersecting)) { startPanel(); obs.disconnect(); }
      }, { threshold: 0.25 });
      panelIO.observe(panel);
    }
  }

  /* ── Copy email ── */
  const EMAIL = ['mrkhondoker', '.prof@', 'gmail', '.com'].join('');
  const toast = document.getElementById('toast');
  let toastTimer;
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.classList.remove('show'); }, 2200);
  }
  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    return ok;
  }
  function copyEmail() {
    const done = () => showToast('Email copied — ' + EMAIL);
    const fail = () => showToast(EMAIL);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).then(done).catch(() => (fallbackCopy(EMAIL) ? done() : fail()));
    } else {
      fallbackCopy(EMAIL) ? done() : fail();
    }
  }
  document.querySelectorAll('[data-copy-email]').forEach(el => el.addEventListener('click', copyEmail));

  /* ------------------------------------------------------------------
     Contact form — delivers the message straight to my Gmail inbox.

     A GitHub Pages site is static: there is no server of mine that can send
     mail, so the form POSTs to FormSubmit, which relays it directly to the
     Gmail address above. No API key, no account, no dashboard.

     ONE-TIME ACTIVATION: the first time this form is submitted, FormSubmit
     emails mrkhondoker.prof@gmail.com a confirmation link. Click it once and
     every later submission arrives in the inbox automatically.

     If the relay is unreachable, the form falls back to a "Compose in Gmail"
     link so the visitor can still send the message by hand.
     ------------------------------------------------------------------ */
  (function () {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const status = document.getElementById('formStatus');
    const btn    = document.getElementById('formSubmitBtn');
    const BTN_LABEL = btn ? btn.textContent : 'Send message';
    const ENDPOINT = 'https://formsubmit.co/ajax/' + EMAIL;

    function say(text, cls) {
      status.textContent = text;
      status.className = 'form-status' + (cls ? ' ' + cls : '');
    }

    /* Fallback: a Gmail compose window, pre-filled. Rendered as a link the
       visitor clicks — auto-opening a tab here would be swallowed by popup
       blockers, since we are already past an await. */
    function offerGmail(name, subject, message, replyTo) {
      const su = subject ? 'Portfolio: ' + subject + ' — from ' + name
                         : 'Portfolio Contact — from ' + name;
      const body = message + '\n\n— ' + name + (replyTo ? '\n' + replyTo : '');
      const gmail = 'https://mail.google.com/mail/?view=cm&fs=1&to=' +
        encodeURIComponent(EMAIL) + '&su=' + encodeURIComponent(su) +
        '&body=' + encodeURIComponent(body);

      status.className = 'form-status error';
      status.textContent = 'Couldn’t send that automatically. ';
      const a = document.createElement('a');
      a.href = gmail; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.textContent = 'Compose it in Gmail instead';
      status.appendChild(a);
      status.appendChild(document.createTextNode(' — or email me at ' + EMAIL + '.'));
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const data    = new FormData(form);
      const name    = (data.get('name')    || '').toString().trim();
      const email   = (data.get('email')   || '').toString().trim();
      const subject = (data.get('subject') || '').toString().trim();
      const message = (data.get('message') || '').toString().trim();

      if (!name || !message) {
        say('Please fill in your name and message.', 'error');
        return;
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        say('Please enter a valid email address so I can reply.', 'error');
        return;
      }
      /* Honeypot — only bots tick this. Pretend it worked, send nothing. */
      if (data.get('botcheck')) {
        say('Thanks — your message has been sent.', 'success');
        form.reset();
        return;
      }

      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      say('Sending your message…', 'pending');

      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            name: name,
            email: email,
            _replyto: email,
            _subject: subject ? 'Portfolio: ' + subject + ' — from ' + name
                              : 'Portfolio Contact — from ' + name,
            message: message,
            _template: 'table',
            _captcha: 'false',
          }),
        });
        const out = await res.json().catch(() => ({}));
        /* FormSubmit returns success as the string "true" */
        if (res.ok && String(out.success) === 'true') {
          say('Thanks — your message is on its way to my inbox. I’ll reply to ' + email + ' within a day.', 'success');
          form.reset();
        } else {
          throw new Error(out.message || 'Relay rejected the submission');
        }
      } catch (err) {
        offerGmail(name, subject, message, email);
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = BTN_LABEL; }
      }
    });
  })();
})();
