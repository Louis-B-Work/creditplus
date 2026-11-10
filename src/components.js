import { APPLY_URL, CTA_LABEL } from './site.js';

export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Responsive photo. Files are produced as assets/img/<slot>-{480,960,1600}.webp
// (and -2400 for the home hero when `wide` is set).
export const photo = (slot, alt, { eager = false, sizes = '(min-width: 1024px) 50vw, 100vw', wide = false } = {}) =>
  `<img src="/assets/img/${slot}-960.webp" srcset="/assets/img/${slot}-480.webp 480w, /assets/img/${slot}-960.webp 960w, /assets/img/${slot}-1600.webp 1600w${
    wide ? `, /assets/img/${slot}-2400.webp 2400w` : ''
  }" sizes="${sizes}" alt="${esc(alt)}" ${eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;

// THE call to action. One label, one URL. `pos` is recorded as data-cta for future tracking.
export const applyButton = (cls = '', pos = 'cta') =>
  `<a class="btn ${cls}" href="${APPLY_URL}" data-apply data-cta="${pos}">${CTA_LABEL}<span class="arrow" aria-hidden="true">&rarr;</span></a>`;

export const button = (href, label, cls = '') =>
  `<a class="btn ${cls}" href="${href}">${label}<span class="arrow" aria-hidden="true">&rarr;</span></a>`;

export const textLink = (href, label, cls = '') =>
  `<a class="text-link ${cls}" href="${href}"><span class="text-link-label">${label}</span><span class="arrow" aria-hidden="true">&rarr;</span></a>`;

export const wordmark = (cls = '') => `<span class="wordmark ${cls}">Creditplus</span>`;

export const heading = ({ title, copy, center = false, light = false }) => `
<div class="section-heading${center ? ' is-center' : ''}${light ? ' is-light' : ''}">
  <h2 class="type-h2">${title}</h2>
  ${copy ? `<p class="type-lead">${copy}</p>` : ''}
</div>`;

// Full-bleed photo hero when `slot` is given, compact hero otherwise.
// Always leads with the big CTA unless `cta: false`.
export const pageHero = ({ title, copy, slot, alt, secondary, note = '', cta = true, wide = false, align = 'center' }) => {
  const ctas = cta
    ? `<div class="hero-cta">${applyButton('btn--lg', 'hero')}${secondary ? textLink(secondary.href, secondary.label) : ''}</div>`
    : '';
  return slot
    ? `
<section class="hero hero--bleed${align === 'left' ? ' hero--left' : ''}">
  <div class="hero-bg">${photo(slot, alt, { eager: true, sizes: '100vw', wide })}</div>
  <div class="page-shell hero-inner">
    <h1 class="type-h1">${title}</h1>
    <p class="type-lead">${copy}</p>
    ${ctas}
    ${note}
  </div>
</section>`
    : `
<section class="hero hero--compact">
  <div class="page-shell hero-inner">
    <h1 class="type-h1">${title}</h1>
    <p class="type-lead">${copy}</p>
    ${ctas}
    ${note}
  </div>
</section>`;
};

// Slim full-width prompt used between sections.
export const ctaStrip = (text = 'Ready to see what&rsquo;s available?') => `
<section class="cta-strip">
  <div class="page-shell strip-inner">
    <p class="strip-text">${text}</p>
    ${applyButton('btn--lg', 'strip')}
  </div>
</section>`;

// Closing photo band, last thing before the footer on every page.
export const ctaBand = ({
  title = 'Ready to get moving?',
  copy = 'Get a no-obligation quote in minutes.',
} = {}) => `
<section class="cta-band">
  <div class="band-bg">${photo('pcp', 'A red electric car parked on a driveway among autumn trees', { sizes: '100vw' })}</div>
  <div class="page-shell cta-inner">
    <h2 class="type-h2">${title}</h2>
    <p class="type-lead">${copy}</p>
    ${applyButton('btn--lg', 'band')}
  </div>
</section>`;

export const steps = (items) => `
<ol class="steps">
  ${items
    .map(
      (s, i) => `<li class="card step"><span class="step-num" aria-hidden="true">${i + 1}</span><h3 class="type-h3">${s.title}</h3><p>${s.copy}</p></li>`,
    )
    .join('')}
</ol>`;

export const cards = (items, cols = 4) => `
<div class="cards cols-${cols}">
  ${items
    .map(
      (c) => `<div class="card"><span class="ico" aria-hidden="true">${c.icon}</span><h3 class="type-h3">${c.title}</h3><p>${c.copy}</p></div>`,
    )
    .join('')}
</div>`;

let faqCount = 0;
export const faq = (items) => {
  const group = `faq${++faqCount}`;
  return `
<div class="faq" data-faq>
  ${items
    .map(
      (q, i) => `
  <div class="faq-item">
    <h3><button type="button" class="faq-q" aria-expanded="false" aria-controls="${group}-a${i}" id="${group}-q${i}">${q.q}<span class="faq-icon" aria-hidden="true"></span></button></h3>
    <div class="faq-answer" id="${group}-a${i}" role="region" aria-labelledby="${group}-q${i}"><div><p>${q.a}</p></div></div>
  </div>`,
    )
    .join('')}
</div>`;
};

export const faqJsonLd = (items) =>
  `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((q) => ({
      '@type': 'Question',
      name: q.q.replace(/<[^>]+>/g, ''),
      acceptedAnswer: { '@type': 'Answer', text: q.a.replace(/<[^>]+>/g, '') },
    })),
  }).replace(/</g, '\\u003c')}</script>`;

export const legalBanner = () =>
  '<p class="draft-banner"><strong>Draft for review.</strong> This page must be checked by a qualified legal professional before launch.</p>';
