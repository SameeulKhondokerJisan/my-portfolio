/* Sameeul Khondoker Jisan — Portfolio scripts */
  /* Dynamic year */
  document.getElementById('yr').textContent = new Date().getFullYear();

  /* Download the Resume (single file, friendly filename) */
  function downloadResume() {
    const a = document.createElement('a');
    a.href = 'Sameeul_Khondoker_Jisan_Resume.pdf';
    a.download = 'Sameeul Khondoker Jisan.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  /* Theme Toggle — icons are swapped by CSS via [data-theme] */
  const themeBtn = document.getElementById('themeToggle');
  const html = document.documentElement;
  function syncThemeLabel() {
    const isDark = html.getAttribute('data-theme') === 'dark';
    themeBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  syncThemeLabel();
  themeBtn.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    syncThemeLabel();
  });

  /* Mobile Nav */
  const hamburgerBtn = document.getElementById('hamburger');
  hamburgerBtn.addEventListener('click', () => {
    const mobileNav = document.getElementById('mobileNav');
    const isOpen = mobileNav.classList.toggle('open');
    hamburgerBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  function closeMobileNav() {
    document.getElementById('mobileNav').classList.remove('open');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
  }

  /* Focus trap for mobile nav */
  document.getElementById('mobileNav').addEventListener('keydown', function(e) {
    if (!this.classList.contains('open')) return;
    const focusable = Array.from(this.querySelectorAll('a, button'));
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    if (e.key === 'Escape') { closeMobileNav(); hamburgerBtn.focus(); }
  });

  /* Back to Top — hide when near page bottom (avoids covering footer icons) */
  const btt = document.getElementById('backToTop');
  /* Passive + rAF-batched: reading scrollHeight on every scroll event forces a
     synchronous layout, which is what makes scrolling feel sticky on phones. */
  let bttQueued = false;
  window.addEventListener('scroll', () => {
    if (bttQueued) return;
    bttQueued = true;
    requestAnimationFrame(() => {
      bttQueued = false;
      const scrolled   = window.scrollY;
      const nearBottom = (window.innerHeight + scrolled) >= (document.body.scrollHeight - 120);
      btt.classList.toggle('visible', scrolled > 400 && !nearBottom);
    });
  }, { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* Scroll animations — animate once (unobserve after first trigger) */
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });
  document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

  /* Active nav highlight */
  document.querySelectorAll('section[id]').forEach(s => {
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.id;
          document.querySelectorAll('.nav-links a').forEach(l => {
            l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { threshold: 0.4 }).observe(s);
  });

  /* Hero role is now a static "Data Analyst" in the markup — the title reads
     "Data Scientist & Data Analyst", so there is nothing left to cycle. */

  /* Roadmap train loop — JS-driven to guarantee seamless 50% translate.
     Pauses on hover AND keyboard focus; disabled entirely for
     prefers-reduced-motion (nodes stay reachable via manual scroll). */
  (function () {
    const track = document.getElementById('roadmapTrack');
    if (!track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let animId, startTime, pausedAt = 0, paused = false;
    const DURATION = 22000;

    function step(ts) {
      if (!startTime) startTime = ts - pausedAt;
      const elapsed = (ts - startTime) % DURATION;
      const halfW = track.scrollWidth / 2;
      const x = -halfW + (elapsed / DURATION) * halfW;
      track.style.transform = `translateX(${x}px)`;
      animId = requestAnimationFrame(step);
    }

    animId = requestAnimationFrame(step);

    function pause() {
      if (paused) return;
      paused = true;
      pausedAt = performance.now() - startTime;
      cancelAnimationFrame(animId);
    }
    function resume() {
      if (!paused) return;
      paused = false;
      startTime = null;
      animId = requestAnimationFrame(step);
    }
    const container = track.parentElement;
    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', resume);
    container.addEventListener('focusin', pause);
    container.addEventListener('focusout', resume);
  })();

  /* ------------------------------------------------------------------
     Contact form — posts to Web3Forms, which forwards the message to my
     inbox. The old version only built a mailto: link, which relied on the
     visitor having an email client configured AND remembering to press
     Send — so most messages never actually arrived.

     SETUP (one time):
       1. Go to https://web3forms.com and enter mrkhondokar.prof@gmail.com
       2. They email you an Access Key (a UUID)
       3. Paste it into WEB3FORMS_KEY below and redeploy
     Until a real key is set, the form falls back to the old mailto: flow.
     ------------------------------------------------------------------ */
  const WEB3FORMS_KEY = 'PASTE-YOUR-WEB3FORMS-ACCESS-KEY-HERE';

  (function () {
    const form = document.getElementById('contactForm');
    if (!form) return;
    const status = document.getElementById('formStatus');
    const btn    = document.getElementById('formSubmitBtn');
    const BTN_LABEL = btn ? btn.textContent : 'Send Message';

    const myEmail = ['mrkhondokar', '.prof@', 'gmail', '.com'].join('');

    function say(text, cls) {
      status.textContent = text;
      status.className = 'form-status' + (cls ? ' ' + cls : '');
    }

    /* Fallback used when no key is configured or the network call fails —
       at least the visitor still has a way to reach me. */
    function mailtoFallback(name, subject, message, replyTo) {
      const s = subject ? `Portfolio: ${subject} — from ${name}` : `Portfolio Contact — from ${name}`;
      const b = `${message}\n\n— ${name}${replyTo ? '\n' + replyTo : ''}`;
      window.location.href = `mailto:${myEmail}?subject=${encodeURIComponent(s)}&body=${encodeURIComponent(b)}`;
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const data    = new FormData(form);
      const name    = (data.get('name')    || '').trim();
      const email   = (data.get('email')   || '').trim();
      const subject = (data.get('subject') || '').trim();
      const message = (data.get('message') || '').trim();

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

      if (!WEB3FORMS_KEY || WEB3FORMS_KEY.indexOf('PASTE-YOUR') === 0) {
        mailtoFallback(name, subject, message, email);
        say('Opening your email app — press Send to deliver the message.', 'success');
        return;
      }

      const payload = {
        access_key: WEB3FORMS_KEY,
        name: name,
        email: email,
        subject: subject ? `Portfolio: ${subject} — from ${name}` : `Portfolio Contact — from ${name}`,
        message: message,
        from_name: 'Portfolio Contact Form',
        replyto: email,
      };

      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
      say('Sending your message…', 'pending');

      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload),
        });
        const out = await res.json().catch(() => ({}));
        if (res.ok && out.success) {
          say('Thanks — your message has been sent. I’ll reply to ' + email + ' within a day.', 'success');
          form.reset();
        } else {
          throw new Error(out.message || 'Submission failed');
        }
      } catch (err) {
        say('Couldn’t send that automatically — opening your email app instead. If nothing opens, email me at ' + myEmail + '.', 'error');
        mailtoFallback(name, subject, message, email);
      } finally {
        if (btn) { btn.disabled = false; btn.textContent = BTN_LABEL; }
      }
    });
  })();

  /* Stat counter animation — triggers once on scroll into view */
  (function(){
    const els = document.querySelectorAll('.stat-num[data-count]');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target   = parseFloat(el.dataset.count);
        const decimals = parseInt(el.dataset.decimals || '0');
        const suffix   = el.dataset.suffix || '';
        const duration = 1400;
        const start    = performance.now();
        function tick(now) {
          let t = Math.min((now - start) / duration, 1);
          t = t < 0.5 ? 2*t*t : -1+(4-2*t)*t;
          el.textContent = (target * t).toFixed(decimals) + suffix;
          if (t < 1) requestAnimationFrame(tick);
          else el.textContent = target.toFixed(decimals) + suffix;
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(el => io.observe(el));
  })();

  /* Hero info cards — rich cycling through portfolio highlights */
  (function () {
    const PATH = {
      grad:   '<path d="M12 2L2 7l10 5 10-5-10-5"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>',
      doc:    '<path d="M14 2H6a2 2 0 00-2 2v16c0 1.1.9 2 2 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>',
      globe:  '<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>',
      cal:    '<rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>',
      code:   '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
      award:  '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/>',
      pulse:  '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>',
      brief:  '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>',
      rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/>',
      term:   '<polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/>',
    };

    const CLR = { cy:'badge-icon-cy', vi:'badge-icon-vi', bl:'badge-icon-bl', mi:'badge-icon-mi', ro:'badge-icon-ro', am:'badge-icon-am' };

    const leftItems = [
      { icon:'grad',   clr:'cy', lbl:'Academic',       val:'3.46 / 4.00',       sub:'BSc Software Engineering, DIU'  },
      { icon:'pulse',  clr:'ro', lbl:'Analytics',      val:'Power BI · SQL',    sub:'Dashboards · KPI Reporting'     },
      { icon:'cal',    clr:'am', lbl:'Graduating',     val:'Class of 2026',     sub:'Daffodil International Univ.'   },
      { icon:'code',   clr:'mi', lbl:'Projects Built', val:'4+ Data / ML',      sub:'Analysis → Production'          },
    ];

    const rightItems = [
      { icon:'award',  clr:'vi', lbl:'Certification',  val:'IBM Certified ×6',  sub:'DS · DA · ML · DL · AI Eng · GenAI' },
      { icon:'pulse',  clr:'mi', lbl:'Availability',   val:'Open to Work',      sub:'Full-time · Remote Friendly'    },
      { icon:'brief',  clr:'bl', lbl:'Experience',     val:'Data Sci. Intern',  sub:'Codio AI · SaiKet Systems'      },
      { icon:'rocket', clr:'cy', lbl:'Career Goal',    val:'Data Scientist',    sub:'Predictive Modelling · BI'      },
      { icon:'term',   clr:'am', lbl:'Core Stack',     val:'Python · SQL',      sub:'Pandas · Power BI · Scikit-learn' },
    ];

    function makeSvg(key) {
      return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${PATH[key]}</svg>`;
    }

    function cycleBadge(badge, items, delay) {
      const iconWrap = badge.querySelector('.badge-icon-wrap');
      const textWrap = badge.querySelector('.badge-text-wrap');
      const lblEl    = badge.querySelector('.badge-lbl');
      const valEl    = badge.querySelector('.badge-val');
      const subEl    = badge.querySelector('.badge-sub');
      const FADE     = 360;
      let idx = 0;

      function apply(item) {
        Object.values(CLR).forEach(c => iconWrap.classList.remove(c));
        iconWrap.classList.add(CLR[item.clr]);
        iconWrap.innerHTML = makeSvg(item.icon);
        lblEl.textContent  = item.lbl;
        valEl.textContent  = item.val;
        subEl.textContent  = item.sub;
      }

      apply(items[0]);

      setTimeout(function tick() {
        /* fade everything out */
        const easing = `opacity ${FADE}ms ease, transform ${FADE}ms ease`;
        textWrap.style.cssText += `;transition:${easing};opacity:0;transform:translateY(-7px)`;
        iconWrap.style.cssText += `;transition:opacity ${FADE}ms ease;opacity:0`;

        setTimeout(() => {
          idx = (idx + 1) % items.length;
          apply(items[idx]);

          /* reset position silently */
          textWrap.style.transition = 'none';
          textWrap.style.transform  = 'translateY(7px)';
          iconWrap.style.transition = 'none';

          requestAnimationFrame(() => requestAnimationFrame(() => {
            textWrap.style.cssText += `;transition:${easing};opacity:1;transform:translateY(0)`;
            iconWrap.style.cssText += `;transition:opacity ${FADE}ms ease;opacity:1`;
          }));

          setTimeout(tick, 3600);
        }, FADE + 60);
      }, delay);
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const leftBadge  = document.querySelector('.badge-left');
    const rightBadge = document.querySelector('.badge-right');
    if (leftBadge)  cycleBadge(leftBadge,  leftItems,  2200);
    if (rightBadge) cycleBadge(rightBadge, rightItems, 4000);
  })();

  /* ── Constellation Particle System ── */
  (function(){
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const isTouch = window.matchMedia('(hover:none)').matches;
    const ctx = canvas.getContext('2d');
    let W, H;
    function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize, {passive:true});

    const COUNT = Math.min(Math.floor(W * H / 24000), 52);
    const pts = Array.from({length: COUNT}, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.32, vy: (Math.random() - 0.5) * 0.32,
      r: Math.random() * 1.5 + 0.4
    }));

    let mx = -9999, my = -9999;
    if (!isTouch) {
      window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, {passive:true});
      window.addEventListener('mouseleave', () => { mx = -9999; my = -9999; });
    }

    function getCol(){
      return document.documentElement.getAttribute('data-theme') === 'light'
        ? [14,116,144] : [34,211,238];
    }

    function frame(){
      ctx.clearRect(0, 0, W, H);
      const [r,g,b] = getCol();
      pts.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        const dx = mx - p.x, dy = my - p.y, d = Math.sqrt(dx*dx + dy*dy);
        if (d < 180) { p.x += dx * 0.006; p.y += dy * 0.006; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},0.28)`;
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 88) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${r},${g},${b},${(1 - dist / 88) * 0.1})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
      });
      requestAnimationFrame(frame);
    }
    frame();
  })();

  /* ── Nav scrolled elevation ── */
  (function(){
    const nav = document.getElementById('navbar');
    if (!nav) return;
    function update(){ nav.classList.toggle('nav-scrolled', window.scrollY > 28); }
    update();
    window.addEventListener('scroll', update, {passive:true});
  })();

  /* ── Hero parallax — lerped for butter-smooth scroll ── */
  (function(){
    if (window.matchMedia('(hover:none)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const heroLeft  = document.querySelector('.hero-left');
    const heroRight = document.querySelector('.hero-right');
    if (!heroLeft || !heroRight) return;
    const home = document.getElementById('home');
    function lerp(a,b,t){ return a + (b - a) * t; }
    let tY = 0, lY = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      tY = (home && y <= home.offsetHeight) ? y : 0;
    }, {passive:true});
    (function tick(){
      lY = lerp(lY, tY, 0.1);
      heroLeft.style.transform  = `translateY(${lY * 0.13}px)`;
      heroRight.style.transform = `translateY(${lY * 0.09}px)`;
      requestAnimationFrame(tick);
    })();
  })();

  /* ── Cursor Ambient Glow ── */
  (function(){
    const glow = document.getElementById('cursorGlow');
    if (!glow || window.matchMedia('(hover:none)').matches) return;
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; glow.style.opacity = '1'; }, {passive:true});
    document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
    function lerp(a, b, t){ return a + (b - a) * t; }
    (function loop(){
      cx = lerp(cx, mx, 0.072);
      cy = lerp(cy, my, 0.072);
      glow.style.left = cx + 'px';
      glow.style.top  = cy + 'px';
      requestAnimationFrame(loop);
    })();
  })();

  /* ── 3D Card Tilt + inner glow ── */
  (function(){
    if (window.matchMedia('(hover:none)').matches) return;
    document.querySelectorAll('.project-card').forEach(card => {
      const glow = card.querySelector('.card-inner-glow');
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        const cx = r.width / 2, cy = r.height / 2;
        const rx = ((y - cy) / cy) * 4;
        const ry = ((x - cx) / cx) * -4;
        card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(4px)`;
        if (glow) {
          glow.style.setProperty('--mx', (x / r.width * 100) + '%');
          glow.style.setProperty('--my', (y / r.height * 100) + '%');
        }
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
      });
    });
  })();

  /* ── Magnetic Primary Button — instant track, spring snap-back ── */
  (function(){
    if (window.matchMedia('(hover:none)').matches) return;
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.18;
        const y = (e.clientY - r.top  - r.height / 2) * 0.18;
        btn.style.transition = 'none';
        btn.style.transform = `translateY(-2px) translate(${x}px,${y}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transition = 'transform 0.42s cubic-bezier(0.16,1,0.3,1),box-shadow 0.3s cubic-bezier(0.4,0,0.2,1)';
        btn.style.transform = '';
      });
    });
  })();

  /* ── Stagger children in view — no delay on touch devices ── */
  (function(){
    const targets = document.querySelectorAll('.skills-grid .skill-category, .projects-grid .project-card');
    const isTouch = window.matchMedia('(hover:none)').matches;
    targets.forEach((el, i) => { el.style.transitionDelay = isTouch ? '0ms' : ((i % 6) * 75 + 'ms'); });
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
    }, {threshold: 0.1});
    targets.forEach(el => io.observe(el));
  })();

  function copyEmail(){
    const email='mrkhondokar.prof@gmail.com';
    const t=document.getElementById('toast');
    const show=()=>{t.textContent='Email copied!';t.classList.add('show');setTimeout(()=>{t.classList.remove('show');t.textContent='';},2200);};
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(email).then(show).catch(()=>{fallbackCopy(email);show();});
    } else { fallbackCopy(email); show(); }
  }
  function fallbackCopy(text){
    const ta=document.createElement('textarea');
    ta.value=text;ta.style.cssText='position:fixed;opacity:0;top:0;left:0;';
    document.body.appendChild(ta);ta.focus();ta.select();
    try{document.execCommand('copy');}catch(e){}
    document.body.removeChild(ta);
  }
