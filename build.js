#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SRC = path.join(ROOT, 'index.html');
const BASE = 'https://www.portcoquitlamgaragedoors.ca';

// ---- Slug map ----
const PAGES = [
  { id: 'home',          slug: '',                            title: 'Garage Door Repair Coquitlam, Port Coquitlam & Port Moody | POCO',     description: 'Same-day garage door repair, spring replacement, opener installation & maintenance in Coquitlam, Port Coquitlam & Port Moody. Call 778-831-0239.', og: 'images/hero-garage.jpg' },
  { id: 'springs',       slug: 'spring-repair',               title: 'Garage Door Spring Repair Coquitlam & Port Coquitlam | POCO',          description: 'Broken garage door spring? Same-day torsion spring replacement in Coquitlam, Port Coquitlam & Port Moody. Lifetime cycle warranty. Call 778-831-0239.', og: 'images/home-spring-repair.jpg' },
  { id: 'openers',       slug: 'garage-door-openers',         title: 'LiftMaster Garage Door Opener Installation & Repair | POCO',           description: 'New LiftMaster, Chamberlain & Genie garage door opener installation, repair & smart upgrades in Coquitlam, Port Coquitlam & Port Moody. Same-day service.', og: 'images/home-opener-upgrade.jpg' },
  { id: 'newdoors',      slug: 'new-garage-doors',            title: 'New Garage Doors Coquitlam, Port Coquitlam & Port Moody',              description: 'Hörmann, Amarr, Garaga and Clopay garage doors — insulated, carriage-house and modern designs supplied and installed in the Tri-Cities. Free in-home quote.', og: 'images/hero-garage.jpg' },
  { id: 'notopening',    slug: 'garage-door-not-opening',     title: "Garage Door Won't Open? Same-Day Repair in the Tri-Cities",            description: 'Garage door not opening in Coquitlam, Port Coquitlam or Port Moody? Free diagnosis on broken springs, snapped cables, dead openers. Call 778-831-0239.', og: 'images/hero-garage.jpg' },
  { id: 'notclosing',    slug: 'garage-door-wont-close',      title: "Garage Door Won't Close — Same-Day Fix in Tri-Cities",                 description: "Door reverses, won't latch or won't close at all? POCO Garage Doors fixes safety sensor, limit switch and roller faults same-day in the Tri-Cities.", og: 'images/hero-garage.jpg' },
  { id: 'commopeners',   slug: 'commercial-openers',          title: 'Commercial Garage Door Openers Coquitlam | POCO Garage Doors',         description: 'LiftMaster commercial jackshaft, trolley & hoist opener installation, repair and replacement in Coquitlam, Port Coquitlam, Port Moody and Burnaby.', og: 'images/services-warehouse-bg.jpg' },
  { id: 'strata',        slug: 'strata',                      title: 'Strata Garage Door & Gate Service Tri-Cities | POCO',                  description: 'Trusted strata garage door, roll-up and parkade gate service across Tri-Cities. Annual maintenance contracts, after-hours response and one-invoice billing.', og: 'images/strata-commercial-gate.jpg' },
  { id: 'warehouse',     slug: 'warehouse-doors',             title: 'Warehouse Garage Doors Coquitlam, Port Coquitlam, Burnaby',            description: 'Sectional, roll-up and high-speed warehouse garage doors supplied, installed and serviced across the Lower Mainland. Tiered maintenance contracts available.', og: 'images/services-warehouse-bg.jpg' },
  { id: 'overhead',      slug: 'commercial-overhead-doors',   title: 'Commercial Overhead Door Service & Repair | POCO Garage Doors',        description: 'Same-day commercial overhead, sectional and high-cycle door repair across Coquitlam, Port Coquitlam, Port Moody and Burnaby. Spring, opener, cable and panel service.', og: 'images/services-warehouse-bg.jpg' },
  { id: 'maintenance',   slug: 'maintenance',                 title: 'Scheduled Garage Door & Gate Maintenance Programs | POCO',             description: 'Annual, semi-annual and quarterly garage door & gate maintenance contracts for strata, retail, commercial and industrial properties in the Tri-Cities.', og: 'images/home-inspection.jpg' },
  { id: 'gateprog',      slug: 'gate-remote-programming',     title: 'Gate Remote & LiftMaster Receiver Programming Tri-Cities',             description: 'Pair one LiftMaster Security+ 2.0 remote with your DEA, FAAC, BFT, CAME, DoorKing or Viking gate. On-site receiver install & programming across the Tri-Cities.', og: 'images/strata-commercial-gate.jpg' },
  { id: 'gateservice',   slug: 'gate-service',                title: 'Swing & Sliding Gate Repair Coquitlam, Port Moody | POCO',             description: 'Residential and strata swing & sliding gate operator repair, replacement and access-control service. LiftMaster, FAAC, BFT, DoorKing, Viking, Nice and Linear.', og: 'images/strata-commercial-gate.jpg' },
  { id: 'coquitlam',     slug: 'garage-door-repair-coquitlam',      title: 'Garage Door Repair Coquitlam — Same-Day Service | POCO',               description: 'Local garage door repair, spring replacement and opener installation in Coquitlam. Same-day response, written warranty, licensed and insured. 778-831-0239.', og: 'images/hero-garage.jpg' },
  { id: 'portcoquitlam', slug: 'garage-door-repair-port-coquitlam', title: 'Garage Door Repair Port Coquitlam — POCO Garage Doors',                description: 'Same-day garage door repair in Port Coquitlam: broken springs, cables, openers, off-track doors. Locally owned. Call 778-831-0239 for a free quote.', og: 'images/hero-garage.jpg' },
  { id: 'portmoody',     slug: 'garage-door-repair-port-moody',     title: 'Garage Door Repair Port Moody — Same-Day Service | POCO',              description: 'Garage door spring, opener and panel repair in Port Moody (including Anmore & Belcarra). Same-day response, lifetime spring warranty. 778-831-0239.', og: 'images/hero-garage.jpg' },
  { id: 'about',         slug: 'about',                       title: 'About POCO Garage Doors — 20 Years Serving the Tri-Cities',            description: 'Family-run garage door specialists serving Coquitlam, Port Coquitlam and Port Moody for over 20 years. Honesty first, fast response, expert craft.', og: 'images/hero-garage.jpg' },
  { id: 'faq',           slug: 'faq',                         title: 'Garage Door Repair FAQ — POCO Garage Doors Tri-Cities',                description: 'Answers to the most common garage door repair questions: spring repair cost, opener lifespan, same-day service, brands, warranties and DIY safety.', og: 'images/hero-garage.jpg' },
  { id: 'contact',       slug: 'contact',                     title: 'Contact POCO Garage Doors — Tri-Cities Same-Day Service',              description: 'Contact POCO Garage Doors for same-day garage door repair in Coquitlam, Port Coquitlam and Port Moody. Phone, text, email or quote request form.', og: 'images/hero-garage.jpg' },
  { id: 'privacy',       slug: 'privacy',                     title: 'Privacy Policy — POCO Garage Doors',                                   description: 'How POCO Garage Doors collects, uses and protects your personal information. Covers Google Ads, Analytics, contact form data and your rights.', og: 'images/hero-garage.jpg' },
];

const idToSlug = Object.fromEntries(PAGES.map(p => [p.id, p.slug]));
function urlFor(id) {
  const slug = idToSlug[id];
  if (slug === undefined) throw new Error('No slug for id: ' + id);
  return slug === '' ? '/' : '/' + slug + '/';
}

// ---- Load source ----
const src = fs.readFileSync(SRC, 'utf8');

// ---- Extract styles ----
const styleMatch = src.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) throw new Error('Could not find <style> block');
const cssContent = styleMatch[1];
fs.writeFileSync(path.join(ROOT, 'styles.css'), cssContent, 'utf8');
console.log('Wrote styles.css (' + cssContent.length + ' bytes)');

// ---- Write scripts.js ----
const scriptsJs = `function toggleFaq(btn) {
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
`;
fs.writeFileSync(path.join(ROOT, 'scripts.js'), scriptsJs, 'utf8');
console.log('Wrote scripts.js (' + scriptsJs.length + ' bytes)');

// ---- Sticky CTA bar (verbatim lines 2130-2140) ----
const stickyCtaHtml = `<!-- STICKY CTA BAR -->
<div class="cta-bar">
  <a href="tel:7788310239" class="cta-call">
    <svg width="20" height="20" viewBox="0 0 24 24"><path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.47 11.47 0 00.57 3.59 1 1 0 01-.25 1.01l-2.2 2.2z"/></svg>
    Call Now &nbsp;778-831-0239
  </a>
  <a href="sms:7788310239?&body=Hi%2C%20I%20need%20garage%20door%20service." class="cta-msg">
    <svg width="20" height="20" viewBox="0 0 24 24"><path d="M20 2H4a2 2 0 00-2 2v18l4-4h14a2 2 0 002-2V4a2 2 0 00-2-2z"/></svg>
    Text Us
  </a>
</div>`;

// ---- Build nav HTML per-page ----
function buildNav(currentId) {
  const directNavIds = new Set(['home', 'about', 'faq', 'contact']);
  const isActive = (id) => currentId === id;

  function navLink(id, label, extraCls) {
    const cls = [];
    if (extraCls) cls.push(extraCls);
    if (isActive(id)) cls.push('active');
    const clsAttr = cls.length ? ' class="' + cls.join(' ') + '"' : '';
    const idAttr = id === 'home' ? ' id="nav-home"' : '';
    return '<a href="' + urlFor(id) + '"' + clsAttr + idAttr + '>' + label + '</a>';
  }

  function dropdownLink(id, label) {
    const cls = isActive(id) ? ' class="active"' : '';
    return '<a href="' + urlFor(id) + '"' + cls + '>' + label + '</a>';
  }

  // Parent-link active state: if the current page is inside that group
  const groups = {
    Residential: ['springs', 'openers', 'newdoors', 'notopening', 'notclosing'],
    Commercial:  ['commopeners', 'strata', 'warehouse', 'overhead', 'maintenance'],
    GateService: ['gateprog', 'gateservice'],
    ServiceAreas:['coquitlam', 'portcoquitlam', 'portmoody'],
  };
  function parentClass(group) {
    return groups[group].includes(currentId) ? ' class="active"' : '';
  }

  return `<!-- NAVIGATION -->
<nav>
  <div class="nav-inner">
    <a href="/" class="nav-logo">
      <img src="/images/logo.png" alt="POCO Garage Doors Logo" width="160" height="80" decoding="async">
    </a>
    <ul class="nav-menu" id="navMenu">
      <li>${navLink('home', 'Home')}</li>
      <li>
        <a href="#"${parentClass('Residential')}>Residential <span class="arrow">&#9662;</span></a>
        <ul class="dropdown">
          <li>${dropdownLink('springs', 'Garage Door Spring Repair')}</li>
          <li>${dropdownLink('openers', 'Garage Door Openers')}</li>
          <li>${dropdownLink('newdoors', 'New Garage Doors')}</li>
          <li>${dropdownLink('notopening', 'Garage Door Not Opening')}</li>
          <li>${dropdownLink('notclosing', "Garage Door Won't Close")}</li>
        </ul>
      </li>
      <li>
        <a href="#"${parentClass('Commercial')}>Commercial <span class="arrow">&#9662;</span></a>
        <ul class="dropdown">
          <li>${dropdownLink('commopeners', 'Commercial Openers')}</li>
          <li>${dropdownLink('strata', 'Strata')}</li>
          <li>${dropdownLink('warehouse', 'Warehouse Garage Doors')}</li>
          <li>${dropdownLink('overhead', 'Commercial Overhead Door Service')}</li>
          <li>${dropdownLink('maintenance', 'Scheduled Maintenance')}</li>
        </ul>
      </li>
      <li>
        <a href="#"${parentClass('GateService')}>Gate Service <span class="arrow">&#9662;</span></a>
        <ul class="dropdown">
          <li>${dropdownLink('gateprog', 'Gate Remote Programming')}</li>
          <li>${dropdownLink('gateservice', 'Swing & Sliding Gate Service')}</li>
        </ul>
      </li>
      <li>
        <a href="#"${parentClass('ServiceAreas')}>Service Areas <span class="arrow">&#9662;</span></a>
        <ul class="dropdown">
          <li>${dropdownLink('coquitlam', 'Coquitlam')}</li>
          <li>${dropdownLink('portcoquitlam', 'Port Coquitlam')}</li>
          <li>${dropdownLink('portmoody', 'Port Moody')}</li>
        </ul>
      </li>
      <li>${navLink('about', 'About Us')}</li>
      <li>${navLink('faq', 'FAQ')}</li>
      <li>${navLink('contact', 'Contact Us', 'nav-cta')}</li>
    </ul>
    <div class="nav-hamburger" onclick="toggleMenu()" id="hamburger" role="button" aria-label="Open menu" aria-expanded="false" aria-controls="navMenu">
      <span></span><span></span><span></span>
    </div>
  </div>
</nav>`;
}

// ---- Footer HTML ----
function buildFooter() {
  return `<!-- FOOTER -->
<footer class="poco-footer">
  <div class="poco-footer-inner">
    <div class="poco-footer-cols">

      <div class="poco-footer-brand">
        <img class="poco-footer-logo" src="/images/logo.png" alt="POCO Garage Doors" loading="lazy" decoding="async">
        <p>Tri-Cities' local garage door specialists. Serving Coquitlam, Port Coquitlam &amp; Port Moody &#8212; residential, strata and commercial.</p>
      </div>

      <div class="poco-footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="${urlFor('springs')}">Spring Repair</a></li>
          <li><a href="${urlFor('openers')}">Openers</a></li>
          <li><a href="${urlFor('newdoors')}">New Doors</a></li>
          <li><a href="${urlFor('commopeners')}">Commercial</a></li>
          <li><a href="${urlFor('strata')}">Strata Programs</a></li>
          <li><a href="${urlFor('maintenance')}">Scheduled Maintenance</a></li>
        </ul>
      </div>

      <div class="poco-footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="${urlFor('about')}">About</a></li>
          <li><a href="${urlFor('coquitlam')}">Service Areas</a></li>
          <li><a href="${urlFor('faq')}">FAQ</a></li>
          <li><a href="${urlFor('contact')}">Contact</a></li>
          <li><a href="${urlFor('privacy')}">Privacy Policy</a></li>
        </ul>
      </div>

      <div class="poco-footer-col">
        <h4>Contact</h4>
        <div class="poco-footer-contact">
          <a class="phone" href="tel:7788310239">(778) 831-0239</a>
          <a class="email" href="mailto:info@portcoquitlamgaragedoors.ca">info@portcoquitlamgaragedoors.ca</a>
          <div class="ft-hours">Mon&ndash;Sat 7am &ndash; 8pm</div>
          <div class="ft-emergency">24/7 after-hours emergency line</div>
          <div class="ft-addr">610-717 Como Lake Ave<br>Coquitlam, BC V3J 0G2</div>
        </div>
      </div>

    </div>
    <div class="poco-footer-bottom">
      <div>&copy; 2026 POCO Garage Doors. Independently owned &amp; operated in the Tri-Cities, BC.</div>
      <div class="creds">Licensed &middot; Insured &middot; WCB Compliant</div>
    </div>
  </div>
</footer>`;
}

// ---- Extract FAQ + HowTo JSON-LD from source ----
function extractScriptByMatch(needle) {
  // Find the <script type="application/ld+json"> ... </script> block whose content contains the needle string.
  const re = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    if (m[1].includes(needle)) return m[0];
  }
  return '';
}
const faqJsonLd = extractScriptByMatch('"FAQPage"');
const howToJsonLd = extractScriptByMatch('"HowTo"');

// ---- Page extraction ----
// Anchor points: find every <div id="page-XXX" class="page...
const pageAnchorRe = /<div id="page-([a-z]+)" class="page[^"]*">/g;
const anchors = [];
let m;
while ((m = pageAnchorRe.exec(src)) !== null) {
  anchors.push({ id: m[1], start: m.index, openLen: m[0].length });
}

// Footer marker
const footerIdx = src.indexOf('<!-- FOOTER -->');
if (footerIdx < 0) throw new Error('No footer marker');

// For each anchor, the boundary = next anchor.start OR footerIdx
const pageBodies = {};
for (let i = 0; i < anchors.length; i++) {
  const a = anchors[i];
  const boundary = (i + 1 < anchors.length) ? anchors[i + 1].start : footerIdx;
  // Slice from inside the opening div to the last </div> before boundary
  const innerStart = a.start + a.openLen;
  const segment = src.substring(innerStart, boundary);
  // Find last </div> in segment
  const lastClose = segment.lastIndexOf('</div>');
  if (lastClose < 0) throw new Error('No closing </div> for page-' + a.id);
  const inner = segment.substring(0, lastClose);
  pageBodies[a.id] = inner;
}

// ---- onclick rewriter ----
function rewriteShowPageInHtml(html) {
  // First: anchor tags. Match the entire <a ... onclick="...showPage('id')..." ...> opening.
  // Strategy: regex over <a tags.
  html = html.replace(/<a\b([^>]*)>/gi, (full, attrs) => {
    // Look for showPage('id') in attrs
    const sp = attrs.match(/showPage\(\s*['"]([a-z]+)['"]\s*\)/i);
    if (!sp) return full;
    const id = sp[1];
    if (!(id in idToSlug)) return full;
    const url = urlFor(id);
    // Remove entire onclick="..." attribute
    let newAttrs = attrs.replace(/\s+onclick\s*=\s*"[^"]*"/i, '');
    newAttrs = newAttrs.replace(/\s+onclick\s*=\s*'[^']*'/i, '');
    // Replace href="..." with href="<url>" (or add if missing)
    if (/\shref\s*=/i.test(newAttrs)) {
      newAttrs = newAttrs.replace(/\shref\s*=\s*"[^"]*"/i, ' href="' + url + '"');
      newAttrs = newAttrs.replace(/\shref\s*=\s*'[^']*'/i, ' href="' + url + '"');
    } else {
      newAttrs = ' href="' + url + '"' + newAttrs;
    }
    return '<a' + newAttrs + '>';
  });

  // Then: any other element (button, div, etc.) with onclick containing showPage
  html = html.replace(/<([a-zA-Z][a-zA-Z0-9]*)\b([^>]*?)\sonclick\s*=\s*"([^"]*showPage\(\s*['"]([a-z]+)['"]\s*\)[^"]*)"([^>]*)>/gi,
    (full, tag, before, onclickVal, id, after) => {
      if (tag.toLowerCase() === 'a') return full; // already handled
      if (!(id in idToSlug)) return full;
      const url = urlFor(id);
      return '<' + tag + before + ' data-href="' + url + '"' + after + '>';
    });
  html = html.replace(/<([a-zA-Z][a-zA-Z0-9]*)\b([^>]*?)\sonclick\s*=\s*'([^']*showPage\(\s*["']([a-z]+)["']\s*\)[^']*)'([^>]*)>/gi,
    (full, tag, before, onclickVal, id, after) => {
      if (tag.toLowerCase() === 'a') return full;
      if (!(id in idToSlug)) return full;
      const url = urlFor(id);
      return '<' + tag + before + ' data-href="' + url + '"' + after + '>';
    });

  return html;
}

// ---- Breadcrumb JSON-LD ----
function buildBreadcrumb(page) {
  const items = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: BASE + '/' },
  ];
  if (page.id !== 'home') {
    items.push({
      '@type': 'ListItem',
      position: 2,
      name: page.title,
      item: BASE + urlFor(page.id),
    });
  }
  const obj = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
  return JSON.stringify(obj, null, 2);
}

// ---- Page template ----
function buildPage(page) {
  const canonicalUrl = BASE + urlFor(page.id);
  const breadcrumbJson = buildBreadcrumb(page);

  let extraJsonLd = '';
  if (page.id === 'home' || page.id === 'faq') {
    extraJsonLd += faqJsonLd + '\n\n';
  }
  if (page.id === 'home' || page.id === 'gateprog') {
    extraJsonLd += howToJsonLd + '\n\n';
  }
  extraJsonLd = extraJsonLd.trim();

  const preloadHero = page.id === 'home'
    ? '<link rel="preload" as="image" href="/images/hero-garage.jpg" fetchpriority="high">'
    : '';

  const navHtml = buildNav(page.id);
  const footerHtml = buildFooter();

  // Rewrite onclick handlers in the page body
  let pageBody = rewriteShowPageInHtml(pageBodies[page.id]);

  // Also rewrite any images/foo references inside pageBody to /images/foo for absolute paths.
  // Only rewrite href/src starting with "images/" (relative) — leave http(s) and "/" untouched.
  pageBody = pageBody.replace(/(\s(?:href|src|data-src|poster))=("|')images\//gi, '$1=$2/images/');
  pageBody = pageBody.replace(/url\(images\//gi, 'url(/images/');

  const escapedTitle = page.title.replace(/&/g, '&amp;');
  const escapedDescription = page.description.replace(/&/g, '&amp;');

  return `<!DOCTYPE html>
<html lang="en-CA">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="theme-color" content="#C0181A">
<meta name="format-detection" content="telephone=yes">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<title>${escapedTitle}</title>
<meta name="description" content="${escapedDescription}">
<meta name="author" content="Port Coquitlam Garage Doors">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1">
<link rel="canonical" href="${canonicalUrl}">
<link rel="alternate" hreflang="en-ca" href="${canonicalUrl}">
<link rel="alternate" hreflang="x-default" href="${canonicalUrl}">

<meta name="geo.region" content="CA-BC">
<meta name="geo.placename" content="Port Coquitlam, Coquitlam, Port Moody">
<meta name="geo.position" content="49.262428;-122.781052">
<meta name="ICBM" content="49.262428, -122.781052">

<meta property="og:type" content="website">
<meta property="og:url" content="${canonicalUrl}">
<meta property="og:title" content="${escapedTitle}">
<meta property="og:description" content="${escapedDescription}">
<meta property="og:image" content="${BASE}/${page.og}">
<meta property="og:image:width" content="1920">
<meta property="og:image:height" content="1080">
<meta property="og:locale" content="en_CA">
<meta property="og:site_name" content="Port Coquitlam Garage Doors">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="${canonicalUrl}">
<meta name="twitter:title" content="${escapedTitle}">
<meta name="twitter:description" content="${escapedDescription}">
<meta name="twitter:image" content="${BASE}/${page.og}">

<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="msapplication-TileColor" content="#FF4D6D">

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.portcoquitlamgaragedoors.ca/#organization",
  "name": "Port Coquitlam Garage Doors",
  "alternateName": "POCO Garage Doors",
  "url": "https://www.portcoquitlamgaragedoors.ca/",
  "logo": "https://www.portcoquitlamgaragedoors.ca/images/logo.png",
  "telephone": "+1-778-831-0239",
  "email": "info@portcoquitlamgaragedoors.ca"
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.portcoquitlamgaragedoors.ca/#business",
  "name": "Port Coquitlam Garage Doors",
  "image": "https://www.portcoquitlamgaragedoors.ca/images/hero-garage.jpg",
  "url": "https://www.portcoquitlamgaragedoors.ca/",
  "telephone": "+1-778-831-0239",
  "priceRange": "$$",
  "address": {"@type":"PostalAddress","streetAddress":"610-717 Como Lake Ave","addressLocality":"Coquitlam","addressRegion":"BC","postalCode":"V3J 3M5","addressCountry":"CA"},
  "geo": {"@type":"GeoCoordinates","latitude":49.262428,"longitude":-122.781052},
  "areaServed": [
    {"@type":"City","name":"Coquitlam"},{"@type":"City","name":"Port Coquitlam"},{"@type":"City","name":"Port Moody"},{"@type":"City","name":"Anmore"},{"@type":"City","name":"Belcarra"},{"@type":"City","name":"Burnaby"},{"@type":"City","name":"New Westminster"}
  ],
  "openingHoursSpecification": [{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":"07:00","closes":"21:00"}],
  "aggregateRating": {"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"127"}
}
</script>

<script type="application/ld+json">
${breadcrumbJson}
</script>

${extraJsonLd}

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;900&family=Barlow+Condensed:wght@400;600;700&display=swap">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;900&family=Barlow+Condensed:wght@400;600;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
<noscript><link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;500;600;700;900&family=Barlow+Condensed:wght@400;600;700&display=swap" rel="stylesheet"></noscript>
<link rel="stylesheet" href="/styles.css">
${preloadHero}
</head>
<body>
${stickyCtaHtml}
${navHtml}
<div class="nav-backdrop" id="navBackdrop" onclick="closeMobileMenu()"></div>
<main class="page active">
${pageBody}
</main>
${footerHtml}
<script src="/scripts.js"></script>
</body>
</html>
`;
}

// ---- Write all pages ----
let totalBytes = 0;
const written = [];
for (const page of PAGES) {
  if (!(page.id in pageBodies)) {
    console.warn('No body found for page-' + page.id + ' — skipping');
    continue;
  }
  const html = buildPage(page);
  let outPath;
  if (page.slug === '') {
    outPath = path.join(ROOT, 'index.html');
  } else {
    const dir = path.join(ROOT, page.slug);
    fs.mkdirSync(dir, { recursive: true });
    outPath = path.join(dir, 'index.html');
  }
  fs.writeFileSync(outPath, html, 'utf8');
  totalBytes += Buffer.byteLength(html, 'utf8');
  written.push(outPath);
}

// ---- Verify: scan all .html files for showPage references ----
function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}
const htmlFiles = walk(ROOT);
let showPageCount = 0;
for (const f of htmlFiles) {
  const c = fs.readFileSync(f, 'utf8');
  const m = c.match(/showPage\(/g);
  if (m) showPageCount += m.length;
}

console.log('\n=== BUILD COMPLETE ===');
console.log('Files written: ' + written.length);
console.log('Total bytes: ' + totalBytes);
console.log('Remaining showPage( references across all .html files: ' + showPageCount);
console.log('\nPaths written:');
for (const p of written) console.log('  ' + p);
