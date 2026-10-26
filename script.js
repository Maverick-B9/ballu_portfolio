// Core interactions: header menu, contact form.
// All motion (particles, zoom, kinetic type, simulations…) lives in motion.js.
(() => {
  /* ---------- header menu (top-right on every screen size) ---------- */
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  const label = menuButton && menuButton.querySelector('.menu-label');
  function setMenu(open) {
    if (!menuButton || !nav) return;
    nav.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    if (label) label.textContent = open ? 'CLOSE' : 'MENU';
  }
  menuButton?.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav?.classList.contains('open')) { setMenu(false); menuButton.focus(); } });
  document.addEventListener('click', (e) => {
    if (nav?.classList.contains('open') && !nav.contains(e.target) && !menuButton.contains(e.target)) setMenu(false);
  });

  /* ---------- contact form ----------
     Messages are delivered to the inbox below through FormSubmit (free, no account).
     The first message ever sent triggers a one-time activation email to that address:
     open it and click the confirm link, and every later message arrives normally.
     To change the inbox, change RECIPIENT here and the `action` URL on the <form>. */
  const RECIPIENT = 'ballubalaram2003@gmail.com';
  const form = document.getElementById('contact-form');
  if (form) {
    const status = form.querySelector('.form-status');
    const btn = form.querySelector('button[type=submit]');
    const btnLabel = btn.querySelector('.btn-label');
    const say = (msg, cls) => { status.className = 'form-status' + (cls ? ' ' + cls : ''); status.textContent = msg; };
    const mailtoHref = (d) => 'mailto:' + RECIPIENT + '?subject=' + encodeURIComponent('Portfolio message from ' + d.name) +
      '&body=' + encodeURIComponent(d.message + '\n\n— ' + d.name + ' (' + d.email + ')');
    function fieldError(input, msg) {
      const wrap = input.closest('.field');
      let err = wrap.querySelector('.err');
      if (msg) {
        if (!err) { err = document.createElement('span'); err.className = 'err'; err.id = input.id + '-err'; wrap.appendChild(err); }
        err.textContent = msg; wrap.classList.add('invalid'); input.setAttribute('aria-invalid', 'true'); input.setAttribute('aria-describedby', err.id);
      } else {
        err?.remove(); wrap.classList.remove('invalid'); input.removeAttribute('aria-invalid'); input.removeAttribute('aria-describedby');
      }
    }
    form.addEventListener('input', (e) => { if (e.target.closest('.field.invalid')) fieldError(e.target, ''); });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const f = form.elements;
      const d = { name: f.name.value.trim(), email: f.email.value.trim(), topic: f.topic.value, message: f.message.value.trim() };
      let bad = null;
      if (!d.name) { fieldError(f.name, 'Please enter your name.'); bad = bad || f.name; } else fieldError(f.name, '');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email)) { fieldError(f.email, 'Please enter a valid email so I can reply.'); bad = bad || f.email; } else fieldError(f.email, '');
      if (d.message.length < 10) { fieldError(f.message, 'Please write at least a sentence.'); bad = bad || f.message; } else fieldError(f.message, '');
      if (f.consent && !f.consent.checked) { fieldError(f.consent, 'Please tick the box so I can read and reply to your message.'); bad = bad || f.consent; } else if (f.consent) fieldError(f.consent, '');
      if (bad) { bad.focus(); say('', ''); return; }
      if (f._honey.value) { say('Thank you. Your message was sent.', 'ok'); form.reset(); return; }   // bots fill the hidden field

      btn.disabled = true; btnLabel.textContent = 'SENDING…'; say('', '');
      const ctl = new AbortController(); const timer = setTimeout(() => ctl.abort(), 15000);
      try {
        const res = await fetch('https://formsubmit.co/ajax/' + RECIPIENT, {
          method: 'POST', signal: ctl.signal,
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: d.name, email: d.email, topic: d.topic, message: d.message,
            _replyto: d.email, _subject: 'Portfolio message from ' + d.name + ' (' + d.topic + ')', _template: 'table', _captcha: 'false',
          }),
        });
        const json = await res.json().catch(() => ({}));
        if (res.ok && (json.success === true || json.success === 'true')) {
          say('Thank you, ' + d.name.split(' ')[0] + '. Your message was sent and I will reply to ' + d.email + '.', 'ok');
          form.reset();
          btnLabel.textContent = 'SENT';
          setTimeout(() => { btn.disabled = false; btnLabel.textContent = 'SEND MESSAGE'; }, 6000);
          return;
        }
        throw new Error(json.message || 'Send failed');
      } catch (err) {
        status.className = 'form-status bad'; status.textContent = '';
        status.append('The message could not be sent from here. Email me directly at ');
        const a = document.createElement('a'); a.href = mailtoHref(d); a.textContent = RECIPIENT; status.append(a, '. Your text is still in the form.');
        btn.disabled = false; btnLabel.textContent = 'SEND MESSAGE';
      } finally { clearTimeout(timer); }
    });
  }
})();
