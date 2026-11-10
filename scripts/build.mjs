// Zero-dependency static site build. Run: `node scripts/build.mjs` (or `npm run build`).
// Renders src/ into plain HTML at the repo root.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { layout } from '../src/layout.js';
import { pages } from '../src/seo.js';
import { company } from '../src/site.js';
import { home } from '../src/pages/home.js';
import { finance } from '../src/pages/finance.js';
import { calculator } from '../src/pages/calculator.js';
import { about } from '../src/pages/about.js';
import { contact } from '../src/pages/contact.js';
import { privacy, cookies, terms, complaints, commission } from '../src/pages/legal.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const routes = {
  '/': { render: home },
  '/car-finance/': { render: finance },
  '/car-finance-calculator/': { render: calculator, scripts: '<script type="module" src="/assets/js/calculator.js"></script>' },
  '/about-us/': { render: about },
  '/contact-us/': { render: contact },
  '/privacy-policy/': { render: privacy },
  '/cookie-policy/': { render: cookies },
  '/terms-and-conditions/': { render: terms },
  '/complaints/': { render: complaints },
  '/commission-disclosure/': { render: commission },
};

// --- checks: fail the build on SEO drift -----------------------------------
const problems = [];
const titles = new Set();
for (const route of Object.keys(routes)) {
  const m = pages[route];
  if (!m) { problems.push(`${route}: missing from src/seo.js`); continue; }
  if (m.title.length > 60) problems.push(`${route}: title is ${m.title.length} chars (max 60)`);
  if (m.description.length < 70 || m.description.length > 160) problems.push(`${route}: description is ${m.description.length} chars (70-160)`);
  if (titles.has(m.title)) problems.push(`${route}: duplicate title`);
  titles.add(m.title);
}
for (const route of Object.keys(pages)) if (!routes[route]) problems.push(`${route}: in seo.js but not built`);
if (problems.length) {
  console.error('Build failed:\n - ' + problems.join('\n - '));
  process.exit(1);
}

// --- write -----------------------------------------------------------------
// Local build: writes next to the sources at the repo root, served from "/".
// Pages build (GitHub Actions): BASE_PATH=/creditplus OUT_DIR=dist writes a self-contained
// folder whose root-relative URLs are prefixed with the project path.
const BASE = (process.env.BASE_PATH || '').replace(/\/$/, '');
const out = process.env.OUT_DIR ? path.resolve(root, process.env.OUT_DIR) : root;
const rebase = (html) =>
  BASE
    ? html
        .replace(/(href|src)="\/(?!\/)/g, '$1="' + BASE + '/')
        .replace(/(srcset="|, )\/assets\//g, '$1' + BASE + '/assets/')
    : html;
const outFile = (route) => path.join(out, route === '/' ? '' : route, 'index.html');
const write = (file, content) => {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
};

const APPLY = 'https://apply.carfinance247.co.uk/';
const ctaProblems = [];
for (const [route, r] of Object.entries(routes)) {
  const html = layout({ path: route, body: r.render(), scripts: r.scripts || '' });
  // CTA-first rules: every page must push people to the apply form, prominently and everywhere.
  const apply = html.match(/<a [^>]*data-apply[^>]*>/g) || [];
  if (apply.length < 5) ctaProblems.push(`${route}: only ${apply.length} apply CTAs (min 5)`);
  for (const a of apply) if (!a.includes(`href="${APPLY}"`)) ctaProblems.push(`${route}: apply CTA with wrong href: ${a.slice(0, 80)}`);
  for (const pos of ['header', 'band', 'sticky-mobile']) {
    if (!html.includes(`data-cta="${pos}"`)) ctaProblems.push(`${route}: missing ${pos} CTA`);
  }
  for (const m of html.matchAll(/<a [^>]*data-apply[^>]*>([^<]*)</g)) {
    if (m[1] !== 'Get my quote') ctaProblems.push(`${route}: apply CTA labelled "${m[1]}" (use CTA_LABEL only)`);
  }
  write(outFile(route), rebase(html));
}
if (ctaProblems.length) {
  console.error('Build failed:\n - ' + ctaProblems.join('\n - '));
  process.exit(1);
}

// Old URL kept alive as a redirect stub (GitHub Pages and similar can't send HTTP redirects).
const target = `${BASE}/car-finance/#bad-credit`;
write(
  path.join(out, 'bad-credit-car-finance', 'index.html'),
  `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<title>Bad credit car finance | Creditplus</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${company.siteUrl}/car-finance/#bad-credit">
<meta http-equiv="refresh" content="0; url=${target}">
<script>location.replace(${JSON.stringify(target)});</script>
</head>
<body><p>This page has moved to <a href="${target}">car finance with bad credit</a>.</p></body>
</html>
`,
);

write(
  path.join(out, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(routes)
  .map((r) => `  <url><loc>${company.siteUrl}${r}</loc><priority>${pages[r].priority}</priority></url>`)
  .join('\n')}
</urlset>
`,
);

// Blocked until launch so a preview copy isn't indexed.
write(path.join(out, 'robots.txt'), 'User-agent: *\nDisallow: /\n');

// Pages build: bring the assets along and stop Jekyll processing.
if (out !== root) {
  fs.cpSync(path.join(root, 'assets'), path.join(out, 'assets'), { recursive: true });
  write(path.join(out, '.nojekyll'), '');
}

console.log(`Built ${Object.keys(routes).length} pages + redirect stub, sitemap.xml, robots.txt`);
