// Legacy hash redirect — for visitors arriving at /#springs etc. from old
// single-page-app links. Map each old page id to its new URL path.
(function legacyHashRedirect() {
  if (!location.hash) return;
  const map = {
    '#home': '/',
    '#springs': '/garage-door-spring-repair/',
    '#openers': '/garage-door-openers/',
    '#newdoors': '/new-garage-doors/',
    '#notopening': '/garage-door-not-opening/',
    '#notclosing': '/garage-door-wont-close/',
    '#commopeners': '/commercial-garage-door-openers/',
    '#strata': '/strata/',
    '#warehouse': '/warehouse-overhead-doors/',
    '#overhead': '/commercial-overhead-doors/',
    '#maintenance': '/scheduled-garage-door-maintenance/',
    '#gateprog': '/gate-remote-programming/',
    '#gateservice': '/gate-service/',
    '#coquitlam': '/garage-door-repair-coquitlam/',
    '#portcoquitlam': '/garage-door-repair-port-coquitlam/',
    '#portmoody': '/garage-door-repair-port-moody/',
    '#about': '/about/',
    '#faq': '/faq/',
    '#contact': '/contact/',
    '#privacy': '/privacy/'
  };
  const target = map[location.hash.toLowerCase()];
  if (target && location.pathname !== target) {
    location.replace(target);
  }
})();

function toggleFaq(btn) {
  const answer = btn.nextElementSibling;
  const isOpen = btn.classList.contains('open');
  document.querySelectorAll('.faq-q.open').forEach(q => { q.classList.remove('open'); q.nextElementSibling.classList.remove('open'); });
  if (!isOpen) { btn.classList.add('open'); answer.classList.add('open'); }
}

function setMobileMenu(open) {
  const menu = document.getElementById('navMenu');
  const ham = document.getElementById('hamburger');
  if (!menu || !ham) return;
  menu.classList.toggle('open', open);
  ham.classList.toggle('open', open);
  document.body.classList.toggle('nav-open', open);
  ham.setAttribute('aria-expanded', open ? 'true' : 'false');
  ham.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  if (!open) document.querySelectorAll('.nav-menu > li.expanded').forEach(li => li.classList.remove('expanded'));
}

function toggleMenu() {
  const menu = document.getElementById('navMenu');
  if (!menu) return;
  setMobileMenu(!menu.classList.contains('open'));
}

function closeMobileMenu() { setMobileMenu(false); }

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.nav-menu > li').forEach(li => {
    const sub = li.querySelector('.dropdown');
    if (!sub) return;
    const link = li.querySelector(':scope > a');
    link.addEventListener('click', (e) => {
      if (window.matchMedia('(max-width: 900px)').matches && link.getAttribute('href') === '#') {
        e.preventDefault();
        document.querySelectorAll('.nav-menu > li.expanded').forEach(other => { if (other !== li) other.classList.remove('expanded'); });
        li.classList.toggle('expanded');
      }
    });
  });
});

document.addEventListener('click', e => {
  if (e.target.closest('a')) {
    return;
  }
  const t = e.target.closest('[data-href]');
  if (t) { e.preventDefault(); window.location.href = t.dataset.href; return; }
  const menu = document.getElementById('navMenu');
  if (menu && menu.classList.contains('open') && !e.target.closest('nav') && !e.target.closest('#navBackdrop') && !e.target.closest('#hamburger')) {
    closeMobileMenu();
  }
});

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 900) closeMobileMenu(); });

// ─── Contact form: AJAX submit with loading / success / error UX ───
// Falls back to call/text/email CTAs if the form service is unreachable
// (e.g. when FormSubmit.co is having a Cloudflare 522 outage).
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('form.poco-form').forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      let status = form.querySelector('.poco-form-status');
      if (!status) {
        status = document.createElement('div');
        status.className = 'poco-form-status';
        form.appendChild(status);
      }
      const originalBtn = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML = 'Sending…';
      status.className = 'poco-form-status loading';
      status.innerHTML = 'Sending your message…';

      // Use FormSubmit's AJAX endpoint when the form action targets formsubmit.co
      let url = form.getAttribute('action') || '';
      if (url.includes('formsubmit.co') && !url.includes('/ajax/')) {
        url = url.replace('formsubmit.co/', 'formsubmit.co/ajax/');
      }
      const data = Object.fromEntries(new FormData(form));

      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 12000);

      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(data),
          signal: ctrl.signal,
        });
        clearTimeout(timer);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        // Web3Forms returns 200 with { success: false } on bad access key, etc.
        let json = null;
        try { json = await res.json(); } catch (_) { /* not JSON — assume success */ }
        if (json && json.success === false) throw new Error(json.message || 'Submission rejected');
        status.className = 'poco-form-status success';
        status.innerHTML = "✓ Thanks! Your message is on its way. We'll be in touch within a few hours.";
        form.reset();
        // Restore the hidden botcheck after reset() unchecks it (it stays unchecked, this is just defensive)
        btn.innerHTML = '✓ Sent';
        // Re-enable after a moment so users can submit a follow-up if needed
        setTimeout(() => { btn.disabled = false; btn.innerHTML = originalBtn; }, 4000);
      } catch (err) {
        clearTimeout(timer);
        status.className = 'poco-form-status error';
        status.innerHTML = '<strong>The form service is temporarily unavailable.</strong> Please reach us directly: '
          + '<a href="tel:7788310239">📞 Call 778-831-0239</a> · '
          + '<a href="sms:7788310239?&body=Hi%2C%20I%20need%20garage%20door%20service.">💬 Text</a> · '
          + '<a href="mailto:info@portcoquitlamgaragedoors.ca?subject=Website%20Inquiry">✉️ Email</a>';
        btn.disabled = false;
        btn.innerHTML = originalBtn;
      }
    });
  });
});
