import { APPLY_URL, company, nav, legalLinks } from './site.js';
import { pages } from './seo.js';
import { esc, applyButton, wordmark } from './components.js';
import { CTA_LABEL } from './site.js';

const orgJsonLd = () =>
  `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: company.name,
    url: company.siteUrl + '/',
    description: 'Car finance broker. Creditplus is a credit broker, not a lender.',
  })}</script>`;

const desktopItem = (n, path) =>
  n.children
    ? `<li class="has-sub"><a href="${n.href}"${path === n.href ? ' aria-current="page"' : ''}>${n.label}</a><button type="button" class="sub-toggle" aria-expanded="false" aria-label="${n.label} menu"></button><ul class="sub">${n.children
        .map((c) => `<li><a href="${c.href}">${c.label}</a></li>`)
        .join('')}</ul></li>`
    : `<li><a href="${n.href}"${path === n.href ? ' aria-current="page"' : ''}>${n.label}</a></li>`;

const mobileItem = (n, path) =>
  `<li><a href="${n.href}"${path === n.href ? ' aria-current="page"' : ''}>${n.label}</a>${
    n.children
      ? `<ul class="mobile-sub">${n.children.slice(1).map((c) => `<li><a href="${c.href}">${c.label}</a></li>`).join('')}</ul>`
      : ''
  }</li>`;

const header = (path) => `
<header class="site-header">
  <div class="page-shell header-inner">
    <a class="logo" href="/" aria-label="Creditplus home">${wordmark()}</a>
    <nav class="desktop-nav" aria-label="Main">
      <ul>
        ${nav.map((n) => desktopItem(n, path)).join('')}
      </ul>
      ${applyButton('btn--sm', 'header')}
    </nav>
    <div class="header-right">
    ${applyButton('btn--sm btn--pill-mobile', 'header-mobile')}
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu">
      <span class="menu-label">Menu</span><span class="menu-bars" aria-hidden="true"></span>
    </button>
    </div>
  </div>
  <div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" hidden>
    <ul>
      ${nav.map((n) => mobileItem(n, path)).join('')}
    </ul>
    ${applyButton('btn--lg', 'menu')}
  </div>
</header>`;

const footer = () => `
<footer class="site-footer">
  <div class="page-shell">
    <div class="foot-grid">
      <div>
        <a class="logo" href="/" aria-label="Creditplus home">${wordmark('wordmark--white')}</a>
        <p class="foot-blurb">Car finance made simple.</p>
        <p class="foot-blurb">Creditplus is a credit broker, not a lender.</p>
      </div>
      <div>
        <h2 class="foot-title">Explore</h2>
        <ul>
          <li><a href="/">Home</a></li>
          ${nav.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}
        </ul>
      </div>
      <div>
        <h2 class="foot-title">Legal</h2>
        <ul>${legalLinks.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('')}</ul>
      </div>
      <div>
        <h2 class="foot-title">Contact</h2>
        <ul class="plain">
          <li>${company.email}</li>
          <li>${company.phone}</li>
          <li>${company.address}</li>
        </ul>
      </div>
    </div>
    <div class="legal">
      <p class="placeholder">${company.regulatory}</p>
      <p>All finance is subject to status and income. Applicants must be 18 or over. We act as a credit broker, not a lender.</p>
      <p>&copy; 2026 ${company.name}. All rights reserved.</p>
    </div>
  </div>
</footer>
<div class="sticky-cta">${applyButton('btn--lg', 'sticky-mobile')}</div>`;

export function layout({ path, body, extraHead = '', scripts = '', robots = '' }) {
  const bleed = body.includes('hero--bleed');
  const meta = pages[path];
  const canonical = company.siteUrl + path;
  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}">
<link rel="canonical" href="${canonical}">
${robots}
<meta property="og:type" content="website">
<meta property="og:site_name" content="Creditplus">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.description)}">
<meta property="og:url" content="${canonical}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#C21BB3">
<link rel="icon" type="image/svg+xml" href="/assets/img/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/styles.css">
${orgJsonLd()}
${extraHead}
</head>
<body class="${bleed ? 'has-bleed' : ''}">
<script>if(document.body.classList.contains('has-bleed'))document.body.classList.add('hdr-clear');</script>
<a class="skip" href="#main">Skip to content</a>
${header(path)}
<main id="main">
${body}
</main>
${footer()}
<script>window.CP_APPLY_URL=${JSON.stringify(APPLY_URL)};</script>
<script src="/assets/js/main.js" defer></script>
${scripts}
</body>
</html>
`;
}
