/* ==========================================================================
   Balaram B. — motion system
   Vanilla JS, no dependencies. One shared requestAnimationFrame loop that
   sleeps whenever nothing is visible or moving. Reads and writes are kept
   apart so the browser never has to re-measure layout mid-frame.

   hero        gravitational particles · glass-plane object · lazy zoom
   thesis      kinetic type · cursor wake · spotlight lens
   interlude   particle disintegration  (IDEA → SYSTEM → REALITY)
   work        environmental memory (traces of case studies you opened)
   engine      elastic grid
   closing     remembered forms converge, CTA emerges
   case pages  four small simulations
   ========================================================================== */
(() => {
  'use strict';

  /* ---------- helpers ---------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
  const lerp = (a, b, t) => a + (b - a) * t;
  const smooth = (a, b, v) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const rand = (a, b) => a + Math.random() * (b - a);
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const SD = document.documentElement.classList.contains('sd');   // CSS scroll-driven animations available

  function fit(cv, maxDpr = 2) {
    const d = Math.min(window.devicePixelRatio || 1, innerWidth < 700 ? Math.min(maxDpr, 1.5) : maxDpr);
    const r = cv.getBoundingClientRect();
    const w = Math.max(1, r.width), h = Math.max(1, r.height);
    cv.width = Math.round(w * d); cv.height = Math.round(h * d);
    const c = cv.getContext('2d');
    c.setTransform(d, 0, 0, d, 0, 0);
    return { c, w, h };
  }

  /* ---------- shared scheduler: runs only while a task says it is active ---------- */
  const tasks = [];
  let raf = 0, lastT = 0;
  const frame = { y: 0 };            // scroll position read ONCE per frame, shared by every task
  const task = (t) => { tasks.push(t); return t; };
  function loop(now) {
    raf = 0;
    const dt = Math.min(0.05, (now - lastT) / 1000) || 0.016;
    lastT = now;
    frame.y = window.scrollY;
    let any = false;
    for (const t of tasks) if (t.active()) { any = true; t.step(dt, now / 1000); }
    if (any) raf = requestAnimationFrame(loop);
  }
  function wake() {
    if (!raf && !document.hidden) { lastT = performance.now(); raf = requestAnimationFrame(loop); }
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) wake(); });
  addEventListener('scroll', wake, { passive: true });

  function visible(el, margin = '80px') {
    const s = { v: false };
    if (!el) return s;
    if (!('IntersectionObserver' in window)) { s.v = true; return s; }
    new IntersectionObserver((es) => { s.v = es[es.length - 1].isIntersecting; if (s.v) wake(); }, { rootMargin: `${margin} 0px` }).observe(el);
    return s;
  }

  const resizers = [];
  let rzT = 0;
  addEventListener('resize', () => { clearTimeout(rzT); rzT = setTimeout(() => { resizers.forEach((f) => f()); wake(); }, 160); });

  const relayout = [];                 // cheap re-measure callbacks, run when the page height changes (fonts, images, accordions)
  if ('ResizeObserver' in window) { let rt = 0; new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => { relayout.forEach((f) => f()); wake(); }, 120); }).observe(document.documentElement); }

  /* session memory (resets when the browser session ends) */
  const store = {
    get() { try { return JSON.parse(sessionStorage.getItem('abs-memory') || '[]'); } catch (e) { return []; } },
    set(v) { try { sessionStorage.setItem('abs-memory', JSON.stringify(v)); } catch (e) { /* storage may be blocked */ } },
  };

  /* ======================================================================
     HERO — gravitational particle field
     ====================================================================== */
  function initParticles() {
    const cv = $('.fx-particles'), stage = $('#hero-stage');
    if (!cv || !stage) return;
    let c, w = 0, h = 0, P = [];
    const ptr = { x: -9999, y: -9999, on: false, sp: 0, t: 0, lx: 0, ly: 0 };
    const vis = visible(stage, '0px');

    function build() {
      const f = fit(cv, 1.5); c = f.c; w = f.w; h = f.h;
      const small = w < 700;
      const n = Math.round(clamp((w * h) / (small ? 5200 : 3600), 140, small ? 280 : 700));
      P = Array.from({ length: n }, () => {
        const x = Math.random() * w, y = Math.random() * h;
        return { hx: x, hy: y, x, y, vx: 0, vy: 0, a: rand(0, 6.283), r: rand(5, 30), s: rand(.15, .6) * (Math.random() < .5 ? -1 : 1), z: Math.random(), k: Math.random() < .07 };
      });
      draw();
    }
    function step(dt) {
      const R = clamp(w * .13, 110, 190);
      for (const p of P) {
        p.a += p.s * dt;
        const tx = p.hx + Math.cos(p.a) * p.r, ty = p.hy + Math.sin(p.a * 1.3) * p.r * .8;
        let ax = (tx - p.x) * 1.4, ay = (ty - p.y) * 1.4;
        if (ptr.on) {
          const dx = p.x - ptr.x, dy = p.y - ptr.y, d2 = dx * dx + dy * dy;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1, f = 1 - d / R, ux = dx / d, uy = dy / d;
            const att = 420 * f * f * (d > 34 ? 1 : -2.2), orb = 640 * f;   // pull in, then orbit
            ax += -ux * att - uy * orb; ay += -uy * att + ux * orb;
            if (ptr.sp > 900) { const sc = (ptr.sp - 900) * .9 * f; ax += ux * sc; ay += uy * sc; } // a fast hand scatters
          }
        }
        p.vx += ax * dt; p.vy += ay * dt;
        const dmp = Math.exp(-1.9 * dt); p.vx *= dmp; p.vy *= dmp;
        p.x += p.vx * dt; p.y += p.vy * dt;
      }
      ptr.sp *= Math.exp(-4 * dt);
      draw();
    }
    function draw() {
      c.clearRect(0, 0, w, h);
      for (const p of P) {
        const spd = Math.hypot(p.vx, p.vy), s = .7 + p.z * 1.2;
        c.globalAlpha = clamp(.18 + p.z * .35 + spd / 260, .1, .95);
        c.fillStyle = p.k ? '#ff3b4f' : spd > 70 ? '#73f0e0' : '#f0eee8';
        c.fillRect(p.x - s / 2, p.y - s / 2, s, s);
      }
      c.globalAlpha = 1;
    }
    build();
    resizers.push(build);
    if (RM) return;
    stage.addEventListener('pointermove', (e) => {
      const r = cv.getBoundingClientRect(), now = performance.now();
      ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; ptr.on = true;
      if (ptr.t) { const dt = Math.max(1, now - ptr.t); ptr.sp = Math.max(ptr.sp, Math.hypot(ptr.x - ptr.lx, ptr.y - ptr.ly) / dt * 1000); }
      ptr.t = now; ptr.lx = ptr.x; ptr.ly = ptr.y;
      wake();
    }, { passive: true });
    stage.addEventListener('pointerleave', () => { ptr.on = false; ptr.t = 0; });
    task({ active: () => vis.v, step });
  }

  /* ======================================================================
     HERO — pointer parallax (always JS) + scroll zoom (JS only as a fallback)
     ====================================================================== */
  function initHero() {
    const stage = $('#hero-stage'), scroller = $('.core-scroll'), core = $('.core-wrap'), h1 = $('.hero h1'), aura = $('.cursor-aura');
    if (!stage || !core || RM) return;
    const S = { tx: 0, ty: 0, cx: 0, cy: 0, lastP: -1, lastCx: 99, lastCy: 99, auraX: 0, auraY: 0, auraOn: false };
    let heroH = stage.offsetHeight || 700;
    resizers.push(() => { heroH = stage.offsetHeight || 700; });
    const vis = visible(stage, '0px');

    if (FINE) {
      stage.addEventListener('pointermove', (e) => {
        const r = stage.getBoundingClientRect();
        S.tx = ((e.clientX - r.left) / r.width - .5) * 2;
        S.ty = ((e.clientY - r.top) / r.height - .5) * 2;
        S.auraX = e.clientX; S.auraY = e.clientY; S.auraOn = true;
        wake();
      }, { passive: true });
      stage.addEventListener('pointerleave', () => { S.tx = 0; S.ty = 0; S.auraOn = false; if (aura) aura.style.opacity = '0'; });
    }

    task({
      active: () => vis.v && (!SD || Math.abs(S.tx - S.cx) > .0005 || Math.abs(S.ty - S.cy) > .0005 || S.auraOn),
      step(dt) {
        /* ---- reads happen first (only frame.y, already cached) ---- */
        const y = frame.y;
        /* ---- writes ---- */
        S.cx += (S.tx - S.cx) * Math.min(1, dt * 5);
        S.cy += (S.ty - S.cy) * Math.min(1, dt * 5);
        if (Math.abs(S.cx - S.lastCx) > .0004 || Math.abs(S.cy - S.lastCy) > .0004) {
          S.lastCx = S.cx; S.lastCy = S.cy;
          core.style.transform = `translate3d(${(-S.cx * 18).toFixed(1)}px,${(-S.cy * 14).toFixed(1)}px,0) rotate(${(S.cx * 4).toFixed(2)}deg)`;
          core.style.setProperty('--ry', (S.cx * 16).toFixed(2) + 'deg');
          core.style.setProperty('--rx', (-S.cy * 10).toFixed(2) + 'deg');
        }
        if (aura && S.auraOn) { aura.style.opacity = '.9'; aura.style.transform = `translate3d(${S.auraX}px,${S.auraY}px,0) translate(-50%,-50%)`; }
        if (!SD) {
          /* fallback for browsers without CSS scroll-driven animations: map scroll straight to transforms (no extra easing lag) */
          const p = clamp(y / (heroH * .95), 0, 1);
          if (Math.abs(p - S.lastP) > .0003) {
            S.lastP = p;
            const e = Math.pow(p, 1.7);
            scroller.style.transform = `translate3d(${(-p * 80).toFixed(1)}px,0,0) rotate(${(p * 38).toFixed(2)}deg) scale(${(1 + e * 6).toFixed(3)})`;
            scroller.style.opacity = (1 - smooth(.55, .97, p)).toFixed(3);
            stage.style.setProperty('--sy', y.toFixed(0));
            stage.style.setProperty('--tear', clamp(p * 1.8 - .1, 0, .6).toFixed(3));
            stage.style.setProperty('--bx', (p * 70).toFixed(1) + 'px');
            if (h1) h1.style.transform = `translate3d(0,${(-p * 40).toFixed(1)}px,0)`;
          }
        }
      },
    });
  }

  /* ======================================================================
     Kinetic typography
     ====================================================================== */
  function splitLines(h) {
    const groups = [[]];
    Array.from(h.childNodes).forEach((n) => { if (n.nodeName === 'BR') groups.push([]); else groups[groups.length - 1].push(n); });
    h.textContent = '';
    groups.filter((g) => g.length).forEach((g, i) => {
      const ln = document.createElement('span'); ln.className = 'ln';
      const inn = document.createElement('span'); inn.className = 'ln-in';
      inn.style.setProperty('--d', (i * .12).toFixed(2) + 's');
      inn.style.setProperty('--fx', i % 2 ? '9%' : '-9%');   // alternate lines slide past one another
      g.forEach((n) => inn.appendChild(n));
      ln.appendChild(inn); h.appendChild(ln);
    });
    h.classList.add('split');
  }

  function initType() {
    const hero = $('.hero h1');
    const heads = $$('.hero h1,[data-split]');
    heads.forEach(splitLines);
    const settle = (h, ms) => setTimeout(() => $$('.ln', h).forEach((l) => l.classList.add('settled')), ms);
    const reveals = $$('[data-reveal]');
    if (RM || !('IntersectionObserver' in window)) {
      heads.forEach((h) => { h.classList.add('in-view'); settle(h, 0); });
      reveals.forEach((r) => r.classList.add('in-view'));
      const g0 = $('.engine-grid'); if (g0) g0.classList.add('in-view');
      return;
    }
    function reveal(h) {
      if (h.classList.contains('in-view')) return;
      h.classList.add('in-view');
      settle(h, h === hero ? 900 : 1800);
      if (h !== hero) { h.classList.add('refracting'); setTimeout(() => h.classList.remove('refracting'), 1300); }
    }
    const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { reveal(en.target); io.unobserve(en.target); } }), { threshold: .25, rootMargin: '0px 0px -8% 0px' });
    heads.filter((h) => h !== hero).forEach((h) => io.observe(h));
    if (hero) { const go = () => setTimeout(() => reveal(hero), 140); (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(go, go); }

    const io3 = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in-view'); io3.unobserve(en.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach((r) => io3.observe(r));
    const grid = $('.engine-grid');
    if (grid) io3.observe(grid);
  }

  /* ======================================================================
     Motion wake (short-lived trail, strict particle cap)
     ====================================================================== */
  function initWake() {
    const cv = $('.fx-wake');
    if (!cv || RM || !FINE) return;
    let c, w, h;
    const size = () => { const f = fit(cv, 1.25); c = f.c; w = f.w; h = f.h; };
    size(); resizers.push(size);
    const pts = [], sparks = [];
    let last = null, light = false;
    const LIFE = 650, MAXS = 140;

    addEventListener('pointermove', (e) => {
      if (e.pointerType === 'touch') return;
      const now = performance.now();
      if (!last) last = { x: e.clientX, y: e.clientY, t: now };
      const dx = e.clientX - last.x, dy = e.clientY - last.y, dt = Math.max(1, now - last.t);
      const sp = Math.hypot(dx, dy) / dt * 1000;
      light = !!(e.target && e.target.closest && e.target.closest('.work,.engine,.page-light'));
      pts.push({ x: e.clientX, y: e.clientY, t: now, sp, light });
      if (pts.length > 40) pts.shift();
      if (sp > 1000) {                                   // sudden movement → brief dispersion
        const n = Math.min(7, Math.floor(sp / 260));
        for (let i = 0; i < n && sparks.length < MAXS; i++) {
          const a = Math.atan2(dy, dx) + Math.PI + rand(-1.2, 1.2), v = rand(60, 280);
          sparks.push({ x: e.clientX, y: e.clientY, vx: Math.cos(a) * v, vy: Math.sin(a) * v, t: now, life: rand(420, 900), light });
        }
      }
      last = { x: e.clientX, y: e.clientY, t: now };
      wake();
    }, { passive: true });

    task({
      active: () => pts.length > 0 || sparks.length > 0,
      step(dt) {
        const now = performance.now();
        while (pts.length && now - pts[0].t > LIFE) pts.shift();
        for (let i = sparks.length - 1; i >= 0; i--) if (now - sparks[i].t > sparks[i].life) sparks.splice(i, 1);
        c.clearRect(0, 0, w, h);
        c.lineCap = 'round'; c.lineJoin = 'round';
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1], b = pts[i], age = 1 - (now - b.t) / LIFE;
          if (age <= 0 || b.t - a.t > 120) continue;
          const slow = 1 - clamp(b.sp / 1800, 0, 1);       // slow = smooth wide ribbon, fast = thin streak
          c.strokeStyle = b.light ? `rgba(220,44,66,${(age * .7).toFixed(3)})` : `rgba(115,240,224,${(age * .8).toFixed(3)})`;
          c.lineWidth = (.6 + slow * 2.4) * age + .3;
          c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke();
        }
        for (const s of sparks) {
          s.x += s.vx * dt; s.y += s.vy * dt; s.vx *= Math.exp(-2.6 * dt); s.vy *= Math.exp(-2.6 * dt);
          c.globalAlpha = clamp(1 - (now - s.t) / s.life, 0, 1) * .9;
          c.fillStyle = s.light ? '#dc2c42' : '#73f0e0';
          c.fillRect(s.x - 1, s.y - 1, 2, 2);
        }
        c.globalAlpha = 1;
      },
    });
  }

  /* ======================================================================
     Cursor spotlight (lens onto a hidden layer) — rect cached, never re-measured per frame
     ====================================================================== */
  function initSpotlight() {
    const sec = $('#collision'), box = $('.collision-content'), lens = $('.spotlight');
    if (!sec || !box || !lens) return;
    if (RM) { lens.classList.add('static'); return; }
    const s = { x: .5, y: .42, tx: .5, ty: .42, on: !FINE, w: 1, h: 1, l: 0, t: 0 };
    const vis = visible(sec);
    if (!FINE) lens.classList.add('on');
    function measure() { const r = box.getBoundingClientRect(); s.w = r.width; s.h = r.height; s.l = r.left; s.t = r.top + window.scrollY; }
    function apply() {
      box.style.setProperty('--sx', (s.x * s.w).toFixed(1) + 'px');
      box.style.setProperty('--sy', (s.y * s.h).toFixed(1) + 'px');
    }
    measure(); apply(); resizers.push(() => { measure(); apply(); }); relayout.push(measure);
    if (FINE) {
      sec.addEventListener('pointermove', (e) => {
        s.tx = (e.clientX - s.l) / s.w; s.ty = (e.clientY + window.scrollY - s.t) / s.h;
        if (!s.on) { s.on = true; s.x = s.tx; s.y = s.ty; lens.classList.add('on'); }
        wake();
      }, { passive: true });
      sec.addEventListener('pointerleave', () => { s.on = false; lens.classList.remove('on'); });
    }
    task({
      active: () => vis.v && (s.on || !FINE),
      step(dt, t) {
        if (!FINE) { s.tx = .5 + .3 * Math.sin(t * .4); s.ty = .45 + .28 * Math.sin(t * .31 + 1); }   // touch: the light wanders by itself
        s.x += (s.tx - s.x) * Math.min(1, dt * 8); s.y += (s.ty - s.y) * Math.min(1, dt * 8);
        apply();
      },
    });
  }

  function initMorph() {
    const sec = $('.morph'), cv = $('.fx-morph');
    if (!sec || !cv) return;
    const WORDS = ['IDEA', 'SYSTEM', 'REALITY'], MAX = innerWidth < 700 ? 850 : 1500;
    let c, w = 0, h = 0, P = [], wi = -1, phase = 'hold', timer = 0, ready = false, built = false;
    const ptr = { x: -999, y: -999, on: false };
    const vis = visible(sec, '0px');

    function sample(word) {
      const o = document.createElement('canvas');
      o.width = Math.max(1, Math.floor(w)); o.height = Math.max(1, Math.floor(h));
      const x = o.getContext('2d', { willReadFrequently: true });
      x.font = '800 100px Manrope, Arial, sans-serif';
      const m = x.measureText(word).width || 300;
      const fs = Math.min(h * .72, (w * .9) / m * 100);
      x.font = `800 ${fs}px Manrope, Arial, sans-serif`;
      x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff';
      x.fillText(word, w / 2, h / 2 + fs * .03);
      const d = x.getImageData(0, 0, o.width, o.height).data, pts = [], g = 3;
      for (let yy = 0; yy < o.height; yy += g) for (let xx = 0; xx < o.width; xx += g) if (d[(yy * o.width + xx) * 4 + 3] > 140) pts.push({ x: xx, y: yy });
      for (let i = pts.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [pts[i], pts[j]] = [pts[j], pts[i]]; }
      return pts.slice(0, MAX);
    }
    let samples = [];
    function build() {
      const f = fit(cv); c = f.c; w = f.w; h = f.h;
      samples = WORDS.map(sample);
      const n = Math.max(...samples.map((s) => s.length));
      P = Array.from({ length: n }, () => ({ x: rand(0, w), y: rand(0, h), vx: 0, vy: 0, tx: 0, ty: 0, on: true, a: 0 }));
      built = true;
      if (RM) { assign(1); P.forEach((p) => { p.x = p.tx; p.y = p.ty; p.a = p.on ? 1 : 0; }); draw(); }
      else if (wi >= 0) assign(wi);
    }
    function assign(i) {
      wi = i;
      const T = samples[i].slice().sort((a, b) => a.x - b.x);
      const Q = P.slice().sort((a, b) => a.x - b.x);       // neighbours in x travel together: tidy flows
      Q.forEach((p, k) => {
        if (k < T.length) { p.tx = T[k].x; p.ty = T[k].y; p.on = true; }
        else { p.tx = rand(0, w); p.ty = rand(0, h); p.on = false; }
      });
    }
    function step(dt) {
      timer += dt;
      if (phase === 'hold' && timer > 2.4) {
        phase = 'dissolve'; timer = 0;
        P.forEach((p) => { const a = rand(0, 6.283), v = rand(120, 520); p.vx = Math.cos(a) * v; p.vy = Math.sin(a) * v - 60; });
      } else if (phase === 'dissolve' && timer > .85) {
        assign((wi + 1) % WORDS.length); phase = 'form'; timer = 0;
      } else if (phase === 'form' && timer > 1) { phase = 'hold'; timer = 0; }
      const free = phase === 'dissolve';
      for (const p of P) {
        let ax = 0, ay = 0;
        if (!free) { ax = (p.tx - p.x) * 22 - p.vx * 7; ay = (p.ty - p.y) * 22 - p.vy * 7; }
        else { ax = -p.vx * 1.5 + rand(-60, 60); ay = -p.vy * 1.5 + rand(-60, 60); }
        if (ptr.on) {
          const dx = p.x - ptr.x, dy = p.y - ptr.y, d2 = dx * dx + dy * dy;
          if (d2 < 110 * 110) { const d = Math.sqrt(d2) || 1, f = 1 - d / 110; ax += dx / d * f * 2400; ay += dy / d * f * 2400; }
        }
        p.vx += ax * dt; p.vy += ay * dt; p.x += p.vx * dt; p.y += p.vy * dt;
        p.a += ((p.on ? 1 : 0) - p.a) * Math.min(1, dt * 4);
      }
      draw();
    }
    function draw() {
      c.clearRect(0, 0, w, h);
      for (const p of P) {
        if (p.a < .02) continue;
        const spd = Math.hypot(p.vx, p.vy);
        c.globalAlpha = clamp(p.a * (.55 + spd / 500), 0, 1);
        c.fillStyle = spd > 90 ? '#73f0e0' : '#f0eee8';
        c.fillRect(p.x - 1, p.y - 1, 2, 2);
      }
      c.globalAlpha = 1;
    }
    const start = () => { build(); ready = true; if (!RM) { assign(0); phase = 'form'; timer = 0; } wake(); };
    (document.fonts && document.fonts.load ? document.fonts.load('800 100px Manrope').catch(() => {}) : Promise.resolve()).then(start);
    resizers.push(() => { if (ready) build(); });
    if (RM) return;
    sec.addEventListener('pointermove', (e) => { const r = cv.getBoundingClientRect(); ptr.x = e.clientX - r.left; ptr.y = e.clientY - r.top; ptr.on = true; wake(); });
    sec.addEventListener('pointerleave', () => { ptr.on = false; });
    task({ active: () => ready && built && vis.v, step });
  }

  /* ======================================================================
     ENGINE — elastic space. Only the cells around the cursor are redrawn.
     ====================================================================== */
  function initElastic() {
    const sec = $('#engine'), cv = $('.fx-elastic');
    if (!sec || !cv) return;
    const S = 46, R = 190, M = 26;
    let c, w = 0, h = 0, cols = 0, rows = 0, N = [], energy = 0, prev = null;
    let ox = 0, oy = 0;
    const ptr = { x: -1e4, y: -1e4, on: false };
    const vis = visible(sec);
    function measure() { const r = cv.getBoundingClientRect(); ox = r.left; oy = r.top + window.scrollY; }
    function build() {
      const f = fit(cv, 1.5); c = f.c; w = f.w; h = f.h; measure();
      cols = Math.ceil(w / S) + 1; rows = Math.ceil(h / S) + 1;
      N = [];
      for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) N.push({ x: i * S, y: j * S, ox: 0, oy: 0, vx: 0, vy: 0 });
      prev = null;
      drawRegion(0, cols - 1, 0, rows - 1);
    }
    function seg(a, b) {
      const d = (Math.hypot(a.ox, a.oy) + Math.hypot(b.ox, b.oy)) * .5, k = clamp(d / 30, 0, 1);
      c.strokeStyle = `rgba(${(7 + 213 * k) | 0},${(8 + 36 * k) | 0},${(10 + 56 * k) | 0},${(.07 + k * .5).toFixed(3)})`;
      c.beginPath(); c.moveTo(a.x + a.ox, a.y + a.oy); c.lineTo(b.x + b.ox, b.y + b.oy); c.stroke();
    }
    function drawRegion(i0, i1, j0, j1) {
      i0 = Math.max(0, i0 - 1); j0 = Math.max(0, j0 - 1); i1 = Math.min(cols - 1, i1 + 1); j1 = Math.min(rows - 1, j1 + 1);
      c.clearRect(i0 * S - M, j0 * S - M, (i1 - i0) * S + 2 * M, (j1 - j0) * S + 2 * M);
      c.lineWidth = 1;
      for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) {
        const n = N[j * cols + i];
        if (i < cols - 1) seg(n, N[j * cols + i + 1]);
        if (j < rows - 1) seg(n, N[(j + 1) * cols + i]);
      }
    }
    function step(dt) {
      energy = 0;
      let i0 = 1e9, i1 = -1, j0 = 1e9, j1 = -1;
      // only nodes in a window around the cursor (or still moving) are simulated
      const wi0 = ptr.on ? Math.max(0, Math.floor((ptr.x - R) / S) - 1) : 0, wi1 = ptr.on ? Math.min(cols - 1, Math.ceil((ptr.x + R) / S) + 1) : cols - 1;
      const wj0 = ptr.on ? Math.max(0, Math.floor((ptr.y - R) / S) - 1) : 0, wj1 = ptr.on ? Math.min(rows - 1, Math.ceil((ptr.y + R) / S) + 1) : rows - 1;
      const lo = prev ? Math.min(wi0, prev.i0) : wi0, hi = prev ? Math.max(wi1, prev.i1) : wi1;
      const lj = prev ? Math.min(wj0, prev.j0) : wj0, hj = prev ? Math.max(wj1, prev.j1) : wj1;
      for (let j = lj; j <= hj; j++) for (let i = lo; i <= hi; i++) {
        const n = N[j * cols + i];
        let tx = 0, ty = 0;
        if (ptr.on) {
          const dx = ptr.x - n.x, dy = ptr.y - n.y, d = Math.hypot(dx, dy);
          if (d < R) { const f = 1 - d / R, k = f * f * .6; tx = dx * k; ty = dy * k; }   // material is drawn toward the cursor
        }
        n.vx += ((tx - n.ox) * 46 - n.vx * 7) * dt; n.vy += ((ty - n.oy) * 46 - n.vy * 7) * dt;
        n.ox += n.vx * dt; n.oy += n.vy * dt;
        const e = Math.abs(n.ox) + Math.abs(n.oy) + (Math.abs(n.vx) + Math.abs(n.vy)) * .1;
        energy += e;
        if (e > .02) { if (i < i0) i0 = i; if (i > i1) i1 = i; if (j < j0) j0 = j; if (j > j1) j1 = j; }
      }
      const cur = i1 >= 0 ? { i0, i1, j0, j1 } : null;
      const a = cur && prev ? { i0: Math.min(cur.i0, prev.i0), i1: Math.max(cur.i1, prev.i1), j0: Math.min(cur.j0, prev.j0), j1: Math.max(cur.j1, prev.j1) } : (cur || prev);
      if (a) drawRegion(a.i0, a.i1, a.j0, a.j1);
      prev = cur;
    }
    build(); resizers.push(build); relayout.push(measure);
    if (RM || !FINE) return;
    sec.addEventListener('pointermove', (e) => { ptr.x = e.clientX - ox; ptr.y = e.clientY + window.scrollY - oy; ptr.on = true; wake(); }, { passive: true });
    sec.addEventListener('pointerleave', () => { ptr.on = false; wake(); });
    task({ active: () => vis.v && (ptr.on || energy > .05 || prev), step });
  }

  function mountSim(wrap, label, factory) {
    const cv = $('canvas', wrap), bar = $('.sim-bar', wrap);
    $('.sim-label', wrap).textContent = label;
    const st = { c: null, w: 0, h: 0, ptr: { x: -999, y: -999, on: false }, cv, bar, t: 0 };
    const sim = factory(st);
    let running = false;
    const vis = visible(wrap, '0px');
    const settle = () => { if (RM) { for (let i = 0; i < 160; i++) sim.step(st, 1 / 60, i / 60); sim.draw(st); } };
    st.changed = () => { wake(); settle(); };
    const fitAll = () => { const f = fit(cv); st.c = f.c; st.w = f.w; st.h = f.h; if (sim.init) sim.init(st); };
    const rel = (e) => { const r = cv.getBoundingClientRect(); st.ptr.x = e.clientX - r.left; st.ptr.y = e.clientY - r.top; };
    cv.addEventListener('pointermove', (e) => { rel(e); st.ptr.on = true; if (RM && sim.hover) { sim.hover(st); sim.draw(st); } wake(); });
    cv.addEventListener('pointerleave', () => { st.ptr.on = false; if (RM && sim.hover) { sim.hover(st); sim.draw(st); } });
    cv.addEventListener('click', (e) => { rel(e); if (sim.click) sim.click(st); st.changed(); if (RM) sim.draw(st); });
    task({ active: () => running && vis.v, step(dt, t) { st.t = t; sim.step(st, dt, t); sim.draw(st); } });
    resizers.push(() => { if (running) { fitAll(); settle(); } });
    return {
      start() { running = true; requestAnimationFrame(() => { fitAll(); if (sim.open) sim.open(st); settle(); if (RM) sim.draw(st); wake(); }); },
      stop() { running = false; },
    };
  }

  /* --- SEMAIS: agents, constraints, coupling --- */
  function simSemais(st) {
    let A = [], O = [], coupling = .6, links = 0;
    st.bar.innerHTML = '<label>COUPLING <input type="range" min="0" max="100" value="60" aria-label="Agent coupling strength"></label><span class="sim-note">CLICK OR TAP THE ARENA TO ADD AN OBSTACLE</span><button class="sim-btn" type="button">CLEAR OBSTACLES</button>';
    const range = $('input', st.bar);
    range.addEventListener('input', () => { coupling = range.value / 100; st.changed(); });
    $('button', st.bar).addEventListener('click', () => { O.length = 0; st.changed(); });
    return {
      init() {
        const n = st.w < 520 ? 38 : 64;
        A = Array.from({ length: n }, () => ({ x: rand(0, st.w), y: rand(0, st.h), vx: rand(-40, 40), vy: rand(-40, 40), wa: rand(0, 6.28), deg: 0 }));
        O = [{ x: st.w * .3, y: st.h * .58, r: 28 }, { x: st.w * .7, y: st.h * .42, r: 36 }];
      },
      click() { O.push({ x: st.ptr.x, y: st.ptr.y, r: rand(20, 40) }); if (O.length > 6) O.shift(); },
      step(_, dt) {
        const L = 60 + coupling * 62, L2 = L * L;
        const obs = st.ptr.on ? O.concat([{ x: st.ptr.x, y: st.ptr.y, r: 14 }]) : O;
        for (const a of A) {
          let cx = 0, cy = 0, ax = 0, ay = 0, sx = 0, sy = 0, n = 0;
          for (const b of A) {
            if (b === a) continue;
            const dx = b.x - a.x, dy = b.y - a.y, d2 = dx * dx + dy * dy;
            if (d2 < L2) { n++; cx += b.x; cy += b.y; ax += b.vx; ay += b.vy; if (d2 < 676) { sx -= dx; sy -= dy; } }
          }
          a.deg = n;
          let fx = 0, fy = 0;
          if (n) { fx += (cx / n - a.x) * coupling * 2.4 + (ax / n - a.vx) * coupling * 2.2; fy += (cy / n - a.y) * coupling * 2.4 + (ay / n - a.vy) * coupling * 2.2; }
          fx += sx * 3.4; fy += sy * 3.4;
          a.wa += rand(-1, 1) * dt * 4; fx += Math.cos(a.wa) * 34; fy += Math.sin(a.wa) * 34;
          for (const o of obs) {
            const dx = a.x - o.x, dy = a.y - o.y, d = Math.hypot(dx, dy) || 1, m = o.r + 34;
            if (d < m) { const f = 1 - d / m; fx += dx / d * f * 1100; fy += dy / d * f * 1100; }
          }
          if (a.x < 24) fx += (24 - a.x) * 9; if (a.x > st.w - 24) fx -= (a.x - st.w + 24) * 9;
          if (a.y < 24) fy += (24 - a.y) * 9; if (a.y > st.h - 24) fy -= (a.y - st.h + 24) * 9;
          a.vx += fx * dt; a.vy += fy * dt;
          const sp = Math.hypot(a.vx, a.vy) || 1, tgt = clamp(sp, 28, 100);
          a.vx *= tgt / sp; a.vy *= tgt / sp;
          a.x += a.vx * dt; a.y += a.vy * dt;
        }
      },
      draw() {
        const c = st.c, L = 60 + coupling * 62;
        c.fillStyle = '#0b1414'; c.fillRect(0, 0, st.w, st.h);
        c.lineWidth = 1; links = 0;
        for (let i = 0; i < A.length; i++) for (let j = i + 1; j < A.length; j++) {
          const a = A[i], b = A[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < L) { links++; c.strokeStyle = `rgba(115,240,224,${((1 - d / L) * .6 * (.3 + coupling * .7)).toFixed(3)})`; c.beginPath(); c.moveTo(a.x, a.y); c.lineTo(b.x, b.y); c.stroke(); }
        }
        c.setLineDash([4, 4]); c.strokeStyle = 'rgba(255,59,79,.75)';
        for (const o of O) { c.beginPath(); c.arc(o.x, o.y, o.r, 0, 6.283); c.stroke(); }
        c.setLineDash([]);
        c.fillStyle = '#73f0e0';
        for (const a of A) { c.beginPath(); c.arc(a.x, a.y, 2 + Math.min(a.deg, 8) * .3, 0, 6.283); c.fill(); }
        c.fillStyle = 'rgba(240,238,232,.55)'; c.font = '9px "DM Mono",monospace';
        c.fillText(`AGENTS ${A.length} · LINKS ${links} · COUPLING ${coupling.toFixed(2)} · OBSTACLES ${O.length}`, 12, st.h - 12);
      },
    };
  }

  /* --- FORENSICS: fragments align into a timeline; hover for (synthetic) metadata --- */
  function simForensics(st) {
    const ITEMS = [
      ['disk_image.dd', 0, 2], ['browser_history.sqlite', 0, 9], ['IMG_0412.jpg', 0, 21], ['report_draft.docx', 0, 44],
      ['pcap_0013.cap', 1, 6], ['dns_log.txt', 1, 17], ['proxy_export.csv', 1, 33],
      ['mem_dump.raw', 2, 12], ['process_list.txt', 2, 27], ['chat_export.json', 2, 51],
    ];
    const LINKS = { 0: [4], 1: [5], 2: [9], 3: [9], 4: [0], 5: [1, 7], 6: [8], 7: [5], 8: [6], 9: [2, 3] };
    const LAYERS = ['FILE SYSTEM', 'NETWORK', 'MEMORY'];
    let F = [], aligned = false, hover = -1, pinned = -1, autoDone = false, openAt = 0;
    const hex = (i) => { let s = (i + 1) * 2654435761 >>> 0, o = []; for (let k = 0; k < 6; k++) { s = (s * 1664525 + 1013904223) >>> 0; o.push((s >>> 24).toString(16).padStart(2, '0')); } return o.join(''); };
    st.bar.innerHTML = '<button class="sim-btn" type="button" data-act="toggle">ALIGN TIMELINE</button><span class="sim-note">HOVER OR TAP A FRAGMENT TO INSPECT ITS METADATA</span>';
    const btn = $('button', st.bar);
    const setAligned = (v) => { aligned = v; btn.textContent = v ? 'SCATTER' : 'ALIGN TIMELINE'; layout(); st.changed(); };
    btn.addEventListener('click', () => setAligned(!aligned));
    function dims() { const s = st.w < 520; return { cw: s ? 66 : 82, ch: s ? 38 : 44, padL: s ? 34 : 96, padR: 22, laneY: (s ? [st.h * .22, st.h * .5, st.h * .78] : [st.h * .24, st.h * .5, st.h * .76]).map((y) => y - 6) }; }
    function layout() {
      const d = dims();
      F.forEach((f, i) => {
        const x = d.padL + d.cw / 2 + (f.t / 55) * (st.w - d.padL - d.padR - d.cw);
        f.tx = aligned ? x : f.sx; f.ty = aligned ? d.laneY[f.layer] + (st.w < 520 ? (f.k % 2 ? 22 : -22) : 0) : f.sy; f.tr = aligned ? 0 : f.sr;
      });
    }
    return {
      init() {
        const d = dims();
        const cnt = [0, 0, 0];
        F = ITEMS.map(([name, layer, t], i) => ({ name, layer, t, i, k: cnt[layer]++, x: st.w / 2, y: st.h / 2, r: 0, sx: rand(d.cw, st.w - d.cw), sy: rand(d.ch + 20, st.h - d.ch - 20), sr: rand(-.5, .5), tx: 0, ty: 0, tr: 0 }));
        F.forEach((f) => { f.x = f.sx; f.y = f.sy; f.r = f.sr; });
        aligned = false; hover = -1; autoDone = false; openAt = 0; btn.textContent = 'ALIGN TIMELINE'; layout();
      },
      open() { openAt = 0; },
      hit() { const d = dims(); for (let i = F.length - 1; i >= 0; i--) { const f = F[i]; if (Math.abs(st.ptr.x - f.x) < d.cw / 2 + 4 && Math.abs(st.ptr.y - f.y) < d.ch / 2 + 4) return i; } return -1; },
      hover() { hover = st.ptr.on ? this.hit() : pinned; },
      click() { const h = this.hit(); pinned = h === pinned ? -1 : h; hover = pinned; },   // tap pins a card (touch has no hover)
      step(_, dt) {
        openAt += dt;
        if (!autoDone && openAt > .7) { autoDone = true; setAligned(true); }
        this.hover();
        const k = Math.min(1, dt * 5);
        for (const f of F) { f.x += (f.tx - f.x) * k; f.y += (f.ty - f.y) * k; f.r += (f.tr - f.r) * k; }
      },
      draw() {
        const c = st.c, d = dims();
        c.fillStyle = '#121211'; c.fillRect(0, 0, st.w, st.h);
        // lanes
        c.font = '8px "DM Mono",monospace'; c.textBaseline = 'middle';
        d.laneY.forEach((y, i) => {
          c.strokeStyle = 'rgba(241,216,169,.14)'; c.lineWidth = 1; c.setLineDash([2, 5]);
          c.beginPath(); c.moveTo(d.padL - 6, y); c.lineTo(st.w - d.padR + 6, y); c.stroke(); c.setLineDash([]);
          if (st.w >= 520) { c.fillStyle = 'rgba(241,216,169,.7)'; c.textAlign = 'left'; c.fillText(LAYERS[i], 12, y); }
        });
        if (aligned) {
          c.fillStyle = 'rgba(174,181,190,.6)'; c.textAlign = 'center';
          for (let m = 0; m <= 55; m += 11) { const x = d.padL + d.cw / 2 + (m / 55) * (st.w - d.padL - d.padR - d.cw); c.fillText(`T+${String(m).padStart(2, '0')}:00`, x, st.h - 14); }
        }
        // relations for hovered card
        if (hover >= 0) {
          c.strokeStyle = 'rgba(255,59,79,.85)'; c.setLineDash([4, 4]);
          LINKS[hover].forEach((j) => { c.beginPath(); c.moveTo(F[hover].x, F[hover].y); c.lineTo(F[j].x, F[j].y); c.stroke(); });
          c.setLineDash([]);
        }
        // cards
        const small = st.w < 520;
        F.forEach((f, i) => {
          const dim = hover >= 0 && i !== hover && !LINKS[hover].includes(i);
          c.save(); c.translate(f.x, f.y); c.rotate(f.r); c.globalAlpha = dim ? .35 : 1;
          c.fillStyle = '#17191b'; c.strokeStyle = i === hover ? '#ff3b4f' : '#f1d8a9'; c.lineWidth = 1;
          c.fillRect(-d.cw / 2, -d.ch / 2, d.cw, d.ch); c.strokeRect(-d.cw / 2 + .5, -d.ch / 2 + .5, d.cw - 1, d.ch - 1);
          c.textAlign = 'left'; c.fillStyle = '#f1d8a9'; c.font = `${small ? 6 : 7}px "DM Mono",monospace`;
          const nm = f.name.length > (small ? 9 : 13) ? f.name.slice(0, small ? 8 : 12) + '…' : f.name;
          c.fillText(nm, -d.cw / 2 + 5, -d.ch / 2 + 11);
          c.fillStyle = '#73f0e0'; c.fillText('0x' + hex(i).slice(0, small ? 4 : 6).toUpperCase(), -d.cw / 2 + 5, -d.ch / 2 + 23);
          c.fillStyle = 'rgba(241,216,169,.4)'; c.fillRect(-d.cw / 2 + 5, d.ch / 2 - 8, d.cw - 10, 1);
          c.restore();
        });
        // tooltip
        if (hover >= 0) {
          const f = F[hover], lines = [f.name, `${LAYERS[f.layer]} · T+${String(f.t).padStart(2, '0')}:00`, `SHA-256 (ILLUSTRATIVE) ${hex(hover)}…`, `LINKED → ${LINKS[hover].map((j) => F[j].name).join(', ')}`];
          c.font = '9px "DM Mono",monospace';
          const tw = Math.min(st.w - 16, Math.max(...lines.map((l) => c.measureText(l).width)) + 20), th = lines.length * 15 + 12;
          let tx = f.x + d.cw / 2 + 10, ty = f.y - th / 2;
          if (tx + tw > st.w - 8) tx = f.x - d.cw / 2 - tw - 10;
          if (tx < 8) tx = 8; ty = clamp(ty, 8, st.h - th - 8);
          c.fillStyle = 'rgba(7,8,10,.96)'; c.fillRect(tx, ty, tw, th); c.strokeStyle = '#ff3b4f'; c.strokeRect(tx + .5, ty + .5, tw - 1, th - 1);
          c.textAlign = 'left'; c.fillStyle = '#f0eee8';
          lines.forEach((l, k) => { c.fillStyle = k === 0 ? '#f1d8a9' : k === 2 ? '#73f0e0' : '#f0eee8'; c.fillText(l.length > 52 ? l.slice(0, 51) + '…' : l, tx + 10, ty + 14 + k * 15); });
        }
        c.textBaseline = 'alphabetic'; c.globalAlpha = 1;
      },
    };
  }

  /* --- AUCTION: tokens travel to franchise zones; purses contract --- */
  function simAuction(st) {
    const FR = [
      { name: 'ALPHA', col: '#73f0e0' }, { name: 'BRAVO', col: '#ff3b4f' },
      { name: 'CHARLIE', col: '#f1d8a9' }, { name: 'DELTA', col: '#82b59a' },
    ];
    const ROLES = ['BAT', 'BOWL', 'ALL', 'WK'], PURSE = 120, CAP = 5, INC = 5;
    let F = [], lot = null, state = 'idle', timer = 0, auto = !RM, lotNo = 0, resetIn = 0, pops = [];
    st.bar.innerHTML = '<button class="sim-btn" data-act="run" type="button">RUN NEXT LOT</button><button class="sim-btn" data-act="auto" type="button">AUTO-RUN: ON</button><button class="sim-btn" data-act="reset" type="button">RESET</button><span class="sim-note">SAMPLE UNITS · RANDOMISED BIDDERS · NOT A LIVE AUCTION</span>';
    const [bRun, bAuto, bReset] = $$('button', st.bar);
    const autoLabel = () => { bAuto.textContent = 'AUTO-RUN: ' + (auto ? 'ON' : 'OFF'); };
    autoLabel();
    bRun.addEventListener('click', () => { if (state === 'idle') nextLot(); st.changed(); });
    bAuto.addEventListener('click', () => { auto = !auto; autoLabel(); st.changed(); });
    bReset.addEventListener('click', () => { reset(); st.changed(); });
    function reset() { F = FR.map((f, i) => ({ ...f, purse: PURSE, shown: PURSE, roster: 0, appetite: rand(.55, 1.05), cx: 0 })); lot = null; state = 'idle'; timer = auto ? .6 : 0; pops = []; }
    function geo() { const g = 10, pw = (st.w - g * 5) / 4; return { g, pw, py: st.h - 104, ph: 90 }; }
    function nextLot() {
      lotNo++;
      const value = rand(18, 62), base = INC * 2;
      const maxes = F.map((f) => (f.roster >= CAP || f.purse < base) ? 0 : Math.min(f.purse, Math.floor(value * f.appetite * rand(.6, 1.35) / INC) * INC));
      const order = maxes.map((m, i) => [m, i]).sort((a, b) => b[0] - a[0]);
      const g = geo();
      lot = { no: lotNo, role: ROLES[(Math.random() * 4) | 0], base, bid: base, maxes, x: st.w / 2, y: 74, vx: 0, vy: 0, a: 1, winner: -1, price: 0 };
      if (order[0][0] >= base) { lot.winner = order[0][1]; lot.price = Math.max(base, Math.min(order[0][0], (order[1][0] || base) + INC)); }
      state = 'bidding'; timer = 0; lot.g = g;
    }
    return {
      init() { reset(); },
      open() { timer = auto ? .8 : 0; },
      step(_, dt) {
        const g = geo();
        F.forEach((f) => { f.shown += (f.purse - f.shown) * Math.min(1, dt * 4); });
        pops = pops.filter((p) => (p.t += dt) < .6);
        if (state === 'idle') {
          timer -= dt;
          const alive = F.some((f) => f.roster < CAP && f.purse >= 10);
          if (!alive) { resetIn += dt; if (resetIn > 2.4) { resetIn = 0; reset(); } }
          else if (auto && timer <= 0) nextLot();
        } else if (state === 'bidding') {
          timer += dt;
          const steps = Math.floor(timer / .075);
          lot.bid = Math.min(lot.winner >= 0 ? lot.price : lot.base, lot.base + steps * INC);
          lot.vx = 0;
          if (lot.winner < 0 && timer > 1.1) { state = 'unsold'; timer = 0; }
          if (lot.winner >= 0 && lot.bid >= lot.price) { state = 'moving'; timer = 0; }
        } else if (state === 'moving') {
          timer += dt;
          const tx = g.g + lot.winner * (g.pw + g.g) + g.pw / 2, ty = g.py + 30;
          lot.x += (tx - lot.x) * Math.min(1, dt * 6); lot.y += (ty - lot.y) * Math.min(1, dt * 6);
          if (timer > .85) {
            const w = F[lot.winner]; w.purse -= lot.price; w.roster++; pops.push({ i: lot.winner, t: 0 });
            state = 'idle'; lot = null; timer = auto ? 1.5 : 0;
          }
        } else if (state === 'unsold') {
          timer += dt; lot.a = 1 - timer / .8;
          if (timer > .8) { state = 'idle'; lot = null; timer = auto ? 1 : 0; }
        }
      },
      draw() {
        const c = st.c, g = geo();
        c.fillStyle = '#141013'; c.fillRect(0, 0, st.w, st.h);
        // franchise zones
        F.forEach((f, i) => {
          const x = g.g + i * (g.pw + g.g), win = lot && state === 'moving' && lot.winner === i;
          c.strokeStyle = f.col; c.globalAlpha = win ? 1 : .55; c.lineWidth = 1; c.strokeRect(x + .5, g.py + .5, g.pw - 1, g.ph - 1);
          c.globalAlpha = 1;
          c.fillStyle = f.col; c.font = '9px "DM Mono",monospace'; c.textAlign = 'left'; c.textBaseline = 'alphabetic';
          c.fillText(f.name, x + 8, g.py + 16);
          c.fillStyle = 'rgba(240,238,232,.6)'; c.font = '8px "DM Mono",monospace';
          c.fillText('PURSE ' + Math.round(f.shown), x + 8, g.py + 52);
          c.fillStyle = 'rgba(240,238,232,.12)'; c.fillRect(x + 8, g.py + 58, g.pw - 16, 4);
          c.fillStyle = f.col; c.fillRect(x + 8, g.py + 58, (g.pw - 16) * clamp(f.shown / PURSE, 0, 1), 4);   // purse contracts as bids land
          for (let k = 0; k < CAP; k++) {
            const pop = pops.find((p) => p.i === i && k === f.roster - 1), r = 4 + (pop ? (1 - pop.t / .6) * 4 : 0);
            c.beginPath(); c.arc(x + 14 + k * 16, g.py + 78, r, 0, 6.283);
            if (k < f.roster) { c.fillStyle = f.col; c.fill(); } else { c.strokeStyle = 'rgba(240,238,232,.3)'; c.stroke(); }
          }
        });
        c.fillStyle = 'rgba(240,238,232,.4)'; c.font = '8px "DM Mono",monospace'; c.textAlign = 'left';
        c.fillText('ROSTER SLOTS ○ ' + CAP + ' PER FRANCHISE', 12, 40);
        if (lot) {
          // bidders (active ones glow)
          if (state === 'bidding') F.forEach((f, i) => {
            const x = g.g + i * (g.pw + g.g) + g.pw / 2, active = lot.maxes[i] >= lot.bid + 0 && lot.maxes[i] > 0;
            c.strokeStyle = f.col; c.globalAlpha = active ? .5 : .08; c.setLineDash([3, 5]);
            c.beginPath(); c.moveTo(lot.x, lot.y + 22); c.lineTo(x, g.py); c.stroke(); c.setLineDash([]); c.globalAlpha = 1;
          });
          c.globalAlpha = lot.a;
          c.fillStyle = '#ff3b4f'; c.fillRect(lot.x - 48, lot.y - 22, 96, 44);
          c.fillStyle = '#10090b'; c.textAlign = 'center'; c.font = '8px "DM Mono",monospace';
          c.fillText(`LOT ${String(lot.no).padStart(2, '0')} · ${lot.role}`, lot.x, lot.y - 6);
          c.font = '700 14px "DM Mono",monospace'; c.fillText(state === 'unsold' ? 'UNSOLD' : '+' + lot.bid, lot.x, lot.y + 14);
          c.globalAlpha = 1;
        } else {
          c.fillStyle = 'rgba(240,238,232,.45)'; c.textAlign = 'center'; c.font = '9px "DM Mono",monospace';
          const alive = F.some((f) => f.roster < CAP && f.purse >= 10);
          c.fillText(alive ? 'AWAITING NEXT LOT' : 'PURSES SPENT · RESETTING', st.w / 2, 78);
        }
        c.textAlign = 'left';
      },
    };
  }

  /* --- VRKSHSAATHI: slow branching growth; tips reveal stewardship topics --- */
  function simVrksh(st) {
    const TOPICS = [
      ['PLANTING RECORD', 'A geotagged entry for each sapling: where and when it was planted.'],
      ['SPECIES KNOWLEDGE', 'Care notes matched to the species so follow-up fits the tree.'],
      ['CITIZEN REPORTING', 'Neighbours could flag a struggling or damaged tree.'],
      ['FOLLOW-UP SCHEDULE', 'Check-ins at defined intervals while the tree is young.'],
      ['LOCAL STEWARD', 'A named local person accountable for a small group of trees.'],
      ['ESCALATION', 'Unresolved reports move up a hierarchy of responsibility.'],
      ['VERIFICATION', 'Photo and location evidence makes responsibility verifiable.'],
      ['SURVIVAL REVIEW', 'Review outcomes over time, then improve the process.'],
    ];
    let B = [], tips = [], time = 0, sel = -1, hov = -1, seed = 7;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    st.bar.innerHTML = '<span class="sim-note">PROPOSED STEWARDSHIP CONCEPTS — SELECT A BRANCH TIP</span><div style="display:flex;flex-wrap:wrap;gap:8px;flex-basis:100%"></div><div class="sim-readout" aria-live="polite"><b>CONCEPT</b>Branches grow slowly. Select a tip to read what it represents.</div>';
    const holder = $('div', st.bar), readout = $('.sim-readout', st.bar);
    TOPICS.forEach((t, i) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'sim-chip'; b.textContent = t[0]; b.addEventListener('click', () => select(i)); holder.appendChild(b); });
    function select(i) {
      sel = i;
      $$('.sim-chip', holder).forEach((b, k) => b.classList.toggle('on', k === i));
      readout.innerHTML = '';
      const b = document.createElement('b'); b.textContent = TOPICS[i][0]; readout.append(b, document.createTextNode(TOPICS[i][1] + ' (proposed feature)'));
      st.changed();
    }
    function build() {
      seed = 7; B = []; tips = [];
      const L0 = st.h * .27;
      const add = (parent, d, ang, len) => {
        const n = { p: parent, d, a0: ang, len, ph: rnd() * 6.28, t0: parent >= 0 ? B[parent].t0 + B[parent].dur * .8 : 0, dur: 1.5 + rnd() * .5, x0: 0, y0: 0, x1: 0, y1: 0, pr: 0 };
        B.push(n); return B.length - 1;
      };
      (function grow(parent, d, ang, len) {
        const i = add(parent, d, ang, len);
        if (d >= 4) { tips.push(i); return; }
        const kids = d === 1 ? 3 : 2;
        for (let k = 0; k < kids; k++) {
          const spread = (k - (kids - 1) / 2) * (.62 + rnd() * .2) + (rnd() - .5) * .2;
          grow(i, d + 1, ang + spread, len * (.7 + rnd() * .1));
        }
      })(-1, 0, -Math.PI / 2, L0);
      tips.sort((a, b) => B[a].a0 - B[b].a0);
      const step = tips.length / TOPICS.length;
      tips = TOPICS.map((_, k) => tips[Math.floor(k * step + step / 2)]);   // 8 labelled tips, left → right
    }
    function pose(t) {
      B.forEach((n) => {
        const pr = clamp((t - n.t0) / n.dur, 0, 1); n.pr = pr * pr * (3 - 2 * pr);
        const sway = Math.sin(t * .5 + n.ph) * .03 * (n.d + 1) * .6, a = n.a0 + sway;
        if (n.p < 0) { n.x0 = st.w / 2; n.y0 = st.h - 16; } else { n.x0 = B[n.p].x1; n.y0 = B[n.p].y1; }
        n.x1 = n.x0 + Math.cos(a) * n.len * n.pr; n.y1 = n.y0 + Math.sin(a) * n.len * n.pr;
      });
    }
    const pathOf = (i) => { const s = new Set(); for (let k = i; k >= 0; k = B[k].p) s.add(k); return s; };
    return {
      init() { build(); time = RM ? 30 : 0; pose(time); },
      open() { time = RM ? 30 : 0; },
      hover(force) {
        hov = -1; if (!st.ptr.on && !force) return;
        const r = st.w < 520 ? 22 : 16;
        tips.forEach((ti, k) => { const n = B[ti]; if (n.pr > .95 && Math.hypot(st.ptr.x - n.x1, st.ptr.y - n.y1) < r) hov = k; });
      },
      click() { this.hover(true); if (hov >= 0) select(hov); },
      step(_, dt) { time += dt; pose(time); this.hover(); },
      draw() {
        const c = st.c;
        const g = c.createLinearGradient(0, 0, 0, st.h); g.addColorStop(0, '#0d1a14'); g.addColorStop(1, '#10231b');
        c.fillStyle = g; c.fillRect(0, 0, st.w, st.h);
        c.strokeStyle = 'rgba(130,181,154,.25)'; c.beginPath(); c.moveTo(0, st.h - 15.5); c.lineTo(st.w, st.h - 15.5); c.stroke();
        const hl = sel >= 0 ? pathOf(tips[sel]) : (hov >= 0 ? pathOf(tips[hov]) : new Set());
        c.lineCap = 'round';
        B.forEach((n, i) => {
          if (n.pr <= 0) return;
          const on = hl.has(i);
          c.strokeStyle = on ? '#c9f5dd' : 'rgba(130,181,154,.78)';
          c.lineWidth = Math.max(1, 7 - n.d * 1.5) + (on ? .8 : 0);
          c.beginPath(); c.moveTo(n.x0, n.y0); c.lineTo(n.x1, n.y1); c.stroke();
        });
        B.forEach((n) => { if (n.d >= 4 && n.pr > .9) { c.fillStyle = 'rgba(130,181,154,.55)'; c.beginPath(); c.arc(n.x1, n.y1, 3, 0, 6.283); c.fill(); } });
        tips.forEach((ti, k) => {
          const n = B[ti]; if (n.pr < .95) return;
          const act = k === sel || k === hov;
          c.strokeStyle = act ? '#c9f5dd' : '#82b59a'; c.fillStyle = act ? '#c9f5dd' : '#0d1a14'; c.lineWidth = 1.2;
          c.beginPath(); c.arc(n.x1, n.y1, act ? 6.5 : 5, 0, 6.283); c.fill(); c.stroke();
          if (k === sel) { const r = 8 + ((st.t * 6) % 6); c.globalAlpha = 1 - (r - 8) / 6; c.beginPath(); c.arc(n.x1, n.y1, r, 0, 6.283); c.stroke(); c.globalAlpha = 1; }
          c.fillStyle = act ? '#c9f5dd' : 'rgba(130,181,154,.7)'; c.font = '8px "DM Mono",monospace'; c.textAlign = 'center';
          c.fillText(String(k + 1).padStart(2, '0'), n.x1, n.y1 - 12);
        });
        c.textAlign = 'left';
      },
    };
  }

  const FORMS = {
    semais: '<svg viewBox="0 0 240 180"><g fill="none" stroke="currentColor" stroke-width="1.2"><path d="M25 85L78 30L124 70L185 22L213 90L160 145L90 130L25 85M78 30L90 130M124 70L160 145M124 70L213 90M25 85L124 70"/></g><g fill="currentColor"><circle cx="25" cy="85" r="5"/><circle cx="78" cy="30" r="7"/><circle cx="124" cy="70" r="10"/><circle cx="185" cy="22" r="5"/><circle cx="213" cy="90" r="7"/><circle cx="160" cy="145" r="6"/><circle cx="90" cy="130" r="5"/></g></svg>',
    forensics: '<svg viewBox="0 0 240 180"><g fill="none" stroke="currentColor" stroke-width="1.2"><rect x="72" y="26" width="96" height="124" transform="rotate(-8 120 88)"/><circle cx="120" cy="90" r="72" stroke-dasharray="4 6"/><path d="M88 62H152M86 82H150M84 102H128M82 122H146" transform="rotate(-8 120 88)"/></g></svg>',
    auction: '<svg viewBox="0 0 240 180"><g fill="none" stroke="currentColor" stroke-width="1.2"><ellipse cx="120" cy="90" rx="48" ry="76" transform="rotate(30 120 90)"/><ellipse cx="120" cy="90" rx="76" ry="40" transform="rotate(-30 120 90)"/><circle cx="120" cy="90" r="76" stroke-dasharray="3 7"/></g><rect x="98" y="76" width="44" height="28" fill="currentColor"/></svg>',
    vrksh: '<svg viewBox="0 0 240 180"><g fill="none" stroke="currentColor" stroke-linecap="round"><path d="M120 162V92L93 68V39M120 111L153 78V40M94 69L65 58V31M153 78L183 62V30M120 92L104 72M120 127L83 111L58 88M120 138L159 121L187 99" stroke-width="2"/><path d="M93 39L80 25M93 39L105 23M153 40L140 24M153 40L169 24M65 31L55 18M65 31L74 15M183 30L175 16M183 30L197 18M58 88L45 79M58 88L66 74M187 99L200 89M187 99L180 83" stroke-width="1.4"/></g></svg>',
  };
  const MEM_POS = {   // where each remembered form lingers in WORLDS (left,top in %), and where it starts in BEYOND
    semais:    { w: ['62%', '10%'], c: ['2%', '6%'] },
    forensics: { w: ['-4%', '34%'], c: ['34%', '1%'] },
    auction:   { w: ['64%', '52%'], c: ['58%', '58%'] },
    vrksh:     { w: ['2%', '70%'], c: ['3%', '60%'] },
  };
  function initWorlds() {
    const SIMS = {
      semais: ['ILLUSTRATIVE SIMULATION — NOT THE ORIGINAL ENGINE', simSemais],
      forensics: ['SYNTHETIC DEMONSTRATION DATA — NOT REAL EVIDENCE', simForensics],
      auction: ['SAMPLE DATA — NO LIVE AUCTION IS RUNNING', simAuction],
      vrksh: ['CONCEPT VISUALISATION — PROPOSED FEATURES', simVrksh],
    };
    const mem = initMemory(new Set(store.get()));
    $$('.world-sim[data-sim]').forEach((wrap) => {
      const id = wrap.dataset.sim, cfg = SIMS[id];
      if (!cfg) return;
      wrap.setAttribute('role', 'group'); wrap.setAttribute('aria-label', cfg[0]);
      wrap.innerHTML = '<canvas aria-hidden="true"></canvas><div class="sim-label mono"></div><div class="sim-bar"></div>';
      mountSim(wrap, cfg[0], cfg[1]).start();
    });
    const page = document.body.dataset.project;
    if (page) mem.add(page);                         // visiting a case study leaves a trace on the home page
  }

  /* ======================================================================
     Environmental memory (home page): forms of the case studies you opened
     ====================================================================== */
  let memApi = { add() {}, opened: new Set(), cEls: {} };
  function initMemory(opened) {
    const work = $('.memory-layer'), conv = $('.convergence'), orb = $('.contact-orb');
    const wEls = {}, cEls = {};
    Object.keys(FORMS).forEach((id) => {
      if (work) { const d = document.createElement('div'); d.className = 'mem'; d.style.left = MEM_POS[id].w[0]; d.style.top = MEM_POS[id].w[1]; d.innerHTML = FORMS[id]; work.appendChild(d); wEls[id] = d; }
      if (conv) { const d = document.createElement('div'); d.className = 'conv'; d.style.left = MEM_POS[id].c[0]; d.style.top = MEM_POS[id].c[1]; d.innerHTML = FORMS[id]; conv.appendChild(d); cEls[id] = d; }
    });
    function sync() {
      opened.forEach((id) => wEls[id] && wEls[id].classList.add('on'));
      if (orb) orb.style.setProperty('--mem', opened.size);
      wake();
    }
    memApi = { add(id) { if (opened.has(id)) return; opened.add(id); store.set([...opened]); setTimeout(sync, 350); }, opened, cEls };
    setTimeout(sync, 400);
    return memApi;
  }

  /* ======================================================================
     Closing band: remembered forms converge on the orb, call-to-action emerges.
     Geometry is measured once (and on resize), never inside the frame loop.
     ====================================================================== */
  function initClosing() {
    const contact = $('#contact'), orb = $('.contact-orb');
    if (!contact || !orb) return;
    if (RM || !('IntersectionObserver' in window)) { contact.classList.add('emerged'); }
    else { const a = $('.cta-actions'); if (a) new IntersectionObserver((es) => { if (es[0].isIntersecting) contact.classList.add('emerged'); }, { threshold: .3 }).observe(a); }
    const m = { top: 0, vh: innerHeight, cx: 0, cy: 0, forms: [] };
    function measure() {
      m.top = contact.getBoundingClientRect().top + window.scrollY; m.vh = innerHeight;
      m.cx = orb.offsetLeft + orb.offsetWidth / 2; m.cy = orb.offsetTop + orb.offsetHeight / 2;
      m.forms = Object.entries(memApi.cEls || {}).map(([id, el]) => ({ id, el, dx: m.cx - (el.offsetLeft + el.offsetWidth / 2), dy: m.cy - (el.offsetTop + el.offsetHeight / 2) }));
    }
    measure(); resizers.push(measure); relayout.push(measure);
    const vis = visible(contact, '200px');
    let last = -1, lastN = -1;
    task({
      active: () => vis.v,
      step() {
        const cp = clamp((m.vh - (m.top - frame.y)) / (m.vh * .78), 0, 1);
        const n = memApi.opened.size;
        if (Math.abs(cp - last) < .002 && n === lastN) return;
        last = cp; lastN = n;
        if (cp > .5) contact.classList.add('emerged');
        const e = smooth(.05, .95, cp) * .9;
        orb.style.transform = `scale(${(1 + cp * .1).toFixed(3)}) rotate(${(cp * 40).toFixed(1)}deg)`;
        for (const f of m.forms) {
          if (!memApi.opened.has(f.id)) { f.el.style.opacity = '0'; continue; }
          f.el.style.transform = `translate3d(${(f.dx * e).toFixed(1)}px,${(f.dy * e).toFixed(1)}px,0) scale(${(1 - .5 * e).toFixed(3)}) rotate(${(e * 140).toFixed(1)}deg)`;
          f.el.style.opacity = (.6 * smooth(0, .2, cp)).toFixed(3);
        }
      },
    });
  }

  /* ---------- boot ---------- */
  function boot() {
    initType();
    initParticles();
    initHero();
    initWake();
    initSpotlight();
    initMorph();
    initElastic();
    initWorlds();
    initClosing();
    wake();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
