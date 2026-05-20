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
