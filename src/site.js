// Single source of truth for site-wide facts. Edit here, then `npm run build`.

// Every "Get my quote" button points here. Swap for the co-branded partner form later
// (assets/js/main.js also rewrites [data-apply] links from the same value injected at build time).
export const APPLY_URL = 'https://apply.carfinance247.co.uk/';

// The one CTA label used on every button. Per ADR-style rule: don't mix labels.
export const CTA_LABEL = 'Get my quote';

export const company = {
  name: 'Creditplus',
  siteUrl: 'https://www.creditplus.co.uk',
  // Placeholders: to be supplied by compliance.
  email: '[email address to be supplied]',
  phone: '[phone number to be supplied]',
  address: '[postal address to be supplied]',
  regulatory:
    '[Regulatory statement: FCA firm name and number, company number, registered address, ICO number and commission disclosure, to be supplied by compliance]',
};

export const nav = [
  {
    label: 'Finance',
    href: '/car-finance/',
    children: [
      { label: 'Car finance', href: '/car-finance/' },
      { label: 'Bad credit finance', href: '/car-finance/#bad-credit' },
    ],
  },
  { label: 'Calculator', href: '/car-finance-calculator/' },
  { label: 'About', href: '/about-us/' },
  { label: 'Contact', href: '/contact-us/' },
];

export const legalLinks = [
  { label: 'Privacy policy', href: '/privacy-policy/' },
  { label: 'Cookie policy', href: '/cookie-policy/' },
  { label: 'Terms & conditions', href: '/terms-and-conditions/' },
  { label: 'Complaints', href: '/complaints/' },
  { label: 'Commission disclosure', href: '/commission-disclosure/' },
];

// Calculator starting values (illustrative). Illustrative only.
export const calculatorDefaults = {
  price: 10000,
  deposit: 0,
  term: 48,
  score: 'excellent',
  type: 'hp',
};
