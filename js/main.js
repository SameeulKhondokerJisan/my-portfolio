/* Sameeul Khondoker Jisan — Portfolio scripts */
  /* Dynamic year */
  document.getElementById('yr').textContent = new Date().getFullYear();

  /* Download both the CV and the Resume on a single click */
  function downloadBothResumes() {
    const files = [
      { href: 'CV___Sameeul_Khondoker_Jisan.pdf', name: 'CV - Sameeul Khondoker Jisan.pdf' },
      { href: 'Resume___Sameeul_Khondoker_Jisan.pdf', name: 'Resume - Sameeul Khondoker Jisan.pdf' }
    ];
    files.forEach((file, i) => {
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = file.href;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, i * 400);
    });
  }

  /* Theme Toggle — label shows what mode you will switch TO */
  const themeBtn = document.getElementById('themeToggle');
  const html = document.documentElement;
  // Sync button label with current theme on load
  themeBtn.textContent = html.getAttribute('data-theme') === 'dark' ? 'Light' : 'Dark';
  themeBtn.setAttribute('aria-label', html.getAttribute('data-theme') === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  themeBtn.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    themeBtn.textContent = isDark ? 'Dark' : 'Light';
    themeBtn.setAttribute('aria-label', isDark ? 'Switch to dark mode' : 'Switch to light mode');
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
    const focusable = Array.from(this.querySelectorAll('a'));
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    if (e.key === 'Escape') { closeMobileNav(); hamburgerBtn.focus(); }
  });

  /* Back to Top — hide when near page bottom (avoids covering footer icons) */
  const btt = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    const scrolled   = window.scrollY;
    const nearBottom = (window.innerHeight + scrolled) >= (document.body.scrollHeight - 120);
    btt.classList.toggle('visible', scrolled > 400 && !nearBottom);
  });
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
            l.style.color = '';
          });
        }
      });
    }, { threshold: 0.4 }).observe(s);
  });


  /* Role typewriter — spring fade with vertical shift */
  (function(){
    const roles = ['Data Scientist','AI Engineer','ML Researcher','AI Researcher','Python Developer'];
    let ri = 0;
    const roleEl = document.getElementById('heroRole');
    if (!roleEl) return;
    roleEl.style.display = 'inline-block';
    function cycle(){
      roleEl.style.transition = 'opacity 0.32s cubic-bezier(0.4,0,0.2,1),transform 0.32s cubic-bezier(0.4,0,0.2,1)';
      roleEl.style.opacity = '0';
      roleEl.style.transform = 'translateY(6px)';
      setTimeout(() => {
        ri = (ri + 1) % roles.length;
        roleEl.textContent = roles[ri];
        roleEl.style.transition = 'none';
        roleEl.style.transform = 'translateY(-6px)';
        requestAnimationFrame(() => requestAnimationFrame(() => {
          roleEl.style.transition = 'opacity 0.44s cubic-bezier(0.16,1,0.3,1),transform 0.44s cubic-bezier(0.16,1,0.3,1)';
          roleEl.style.opacity = '1';
          roleEl.style.transform = 'translateY(0)';
        }));
      }, 360);
    }
    setInterval(cycle, 3200);
  })();

  /* Roadmap train loop — JS-driven to guarantee seamless 50% translate */
  (function () {
    const track = document.getElementById('roadmapTrack');
    if (!track) return;
    let animId, startTime, pausedAt = 0, paused = false;
    const DURATION = 20000;

    function step(ts) {
      if (!startTime) startTime = ts - pausedAt;
      const elapsed = (ts - startTime) % DURATION;
      const halfW = track.scrollWidth / 2;
      const x = -halfW + (elapsed / DURATION) * halfW;
      track.style.transform = `translateX(${x}px)`;
      animId = requestAnimationFrame(step);
    }

    animId = requestAnimationFrame(step);

    track.parentElement.addEventListener('mouseenter', () => {
      paused = true;
      pausedAt = performance.now() - startTime;
      cancelAnimationFrame(animId);
    });
    track.parentElement.addEventListener('mouseleave', () => {
      paused = false;
      startTime = null;
      animId = requestAnimationFrame(step);
    });
  })();

  /* Contact form — sends via Web3Forms (works on localhost + GitHub Pages) */
  document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn    = document.getElementById('formSubmitBtn');
    const status = document.getElementById('formStatus');
    const data   = new FormData(this);
    const name    = (data.get('name')    || '').trim();
    const email   = (data.get('email')   || '').trim();
    const subject = (data.get('subject') || 'Portfolio Contact').trim();
    const message = (data.get('message') || '').trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill in your name, email, and message.';
      status.className = 'form-status error';
      status.style.display = 'block';
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending…';
    status.style.display = 'none';

    const ep     = ['mrkhondokar', '.prof@', 'gmail', '.com'].join('');
    const mailto = `mailto:${ep}?subject=${encodeURIComponent('Portfolio Contact: ' + subject)}&body=${encodeURIComponent(message)}`;

    /* ── Web3Forms ──────────────────────────────────────────────────────────
       Get your free access key at https://web3forms.com → enter your email.
       Replace the placeholder below with your key (no activation step needed).
    ──────────────────────────────────────────────────────────────────────── */
    const WEB3FORMS_KEY = '1861fdc6-3d9e-4519-80e5-75581be662f3';

    let succeeded = false;
    try {
      const res  = await fetch('https://api.web3forms.com/submit', {
        method : 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body   : JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name, email, message,
          subject: `Portfolio Contact: ${subject}`,
          replyto: email,
          botcheck: ''
        })
      });
      const json = await res.json();
      /* 200 OK = submission recorded; treat as success regardless of email delivery status */
      succeeded = res.ok;
    } catch (_) { succeeded = false; }

    if (succeeded) {
      btn.textContent = 'Message Sent ✓';
      status.textContent = "Thank you for reaching out! I'll get back to you soon.";
      status.className = 'form-status success';
      this.reset();
    } else {
      btn.textContent = 'Send Message ✈';
      status.innerHTML = `Delivery failed — <a href="${mailto}" style="color:inherit;text-decoration:underline;">click here to email directly</a> instead.`;
      status.className = 'form-status error';
    }

    btn.disabled = false;
    status.style.display = 'block';
    setTimeout(() => {
      if (status.className.includes('success')) {
        btn.textContent = 'Send Message ✈';
        status.style.display = 'none';
      }
    }, 6000);
  });

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

    const CLR = { em:'badge-icon-em', am:'badge-icon-am', bl:'badge-icon-bl', ro:'badge-icon-ro', pu:'badge-icon-pu', cy:'badge-icon-cy' };

    const leftItems = [
      { icon:'grad',   clr:'em', lbl:'Academic',          val:'3.55 / 4.0',      sub:'BSc Software Engineering, DIU'  },
      { icon:'doc',    clr:'ro', lbl:'Research',           val:'1 Paper',          sub:'Carbon Footprint · In Progress' },
      { icon:'globe',  clr:'bl', lbl:'English',            val:'IELTS Band 7.0',   sub:'C1 Level · International'       },
      { icon:'cal',    clr:'am', lbl:'Graduating',         val:'Class of 2026',    sub:'Daffodil International Univ.'   },
      { icon:'code',   clr:'cy', lbl:'Projects Built',     val:'6+ AI / ML',       sub:'Research → Production'          },
    ];

    const rightItems = [
      { icon:'award',  clr:'am', lbl:'Certification',      val:'IBM Certified',    sub:'Data Science & Data Analytics'  },
      { icon:'pulse',  clr:'em', lbl:'Availability',       val:'Open to Work',     sub:'Full-time · Remote Friendly'    },
      { icon:'brief',  clr:'bl', lbl:'Experience',         val:'Data Sci. Intern',  sub:'Codio AI · SaiKet Systems'      },
      { icon:'rocket', clr:'pu', lbl:'Career Goal',        val:'AI Engineer',      sub:'ML Research · AI Systems'       },
      { icon:'term',   clr:'cy', lbl:'Core Stack',         val:'Python · PyTorch', sub:'XGBoost · Transformers'         },
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

    const leftBadge  = document.querySelector('.badge-left');
    const rightBadge = document.querySelector('.badge-right');
    if (leftBadge)  cycleBadge(leftBadge,  leftItems,  2200);
    if (rightBadge) cycleBadge(rightBadge, rightItems, 4000);
  })();

  /* ── Constellation Particle System ── */
  (function(){
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
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
        ? [13,110,85] : [52,211,153];
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
    if (window.matchMedia('(hover:none)').matches) return;
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
    let raf;
    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; glow.style.opacity = '1'; }, {passive:true});
    document.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });
    function lerp(a, b, t){ return a + (b - a) * t; }
    function loop(){
      cx = lerp(cx, mx, 0.072);
      cy = lerp(cy, my, 0.072);
      glow.style.left = cx + 'px';
      glow.style.top  = cy + 'px';
      raf = requestAnimationFrame(loop);
    }
    loop();
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

  /* ── Section heading underline draw ── */
  (function(){
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); io.unobserve(e.target); } });
    }, {threshold: 0.4});
    document.querySelectorAll('.section-title').forEach(h => io.observe(h));
  })();

  function copyEmail(){
    const email='mrkhondokar.prof@gmail.com';
    const t=document.getElementById('toast');
    const show=()=>{t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2200);};
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
