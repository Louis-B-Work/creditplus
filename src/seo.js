// Per-page metadata. The build fails if a title is over 60 characters or a
// description is outside 70-160 characters, or if any page is missing here.
export const pages = {
  '/': {
    label: 'Home',
    title: 'Creditplus | Car finance made simple',
    description:
      'Creditplus is a car finance broker. Compare Hire Purchase and PCP, try the calculator and get a quote in minutes with no obligation.',
    priority: 1,
  },
  '/car-finance/': {
    label: 'Car finance',
    title: 'Car finance explained: HP, PCP and bad credit | Creditplus',
    description:
      'How car finance works, Hire Purchase compared with PCP, what you need to apply and how lenders look at less-than-perfect credit.',
    priority: 0.9,
  },
  '/car-finance-calculator/': {
    label: 'Calculator',
    title: 'Car finance calculator | Creditplus',
    description:
      'Estimate your monthly car finance payment for Hire Purchase or PCP. Adjust price, deposit, term and APR to see an illustrative cost.',
    priority: 0.9,
  },
  '/about-us/': {
    label: 'About us',
    title: 'About Creditplus | Car finance broker',
    description:
      'Creditplus is a credit broker, not a lender. Learn how we work with a panel of lenders to help drivers find finance.',
    priority: 0.6,
  },
  '/contact-us/': {
    label: 'Contact us',
    title: 'Contact Creditplus',
    description:
      'Get in touch with Creditplus about a new car finance quote, an existing agreement or a dealer enquiry.',
    priority: 0.6,
  },
  '/privacy-policy/': {
    label: 'Privacy policy',
    title: 'Privacy policy | Creditplus',
    description:
      'How Creditplus collects, uses and protects your personal information, who we share it with and your data protection rights.',
    priority: 0.3,
  },
  '/cookie-policy/': {
    label: 'Cookie policy',
    title: 'Cookie policy | Creditplus',
    description:
      'What cookies the Creditplus website uses, why, and how you can control them in your browser settings.',
    priority: 0.3,
  },
  '/terms-and-conditions/': {
    label: 'Terms & conditions',
    title: 'Terms and conditions | Creditplus',
    description:
      'The terms for using the Creditplus website, including our role as a credit broker and the limits of the information and calculators we provide.',
    priority: 0.3,
  },
  '/complaints/': {
    label: 'Complaints',
    title: 'Complaints | Creditplus',
    description:
      'How to make a complaint to Creditplus, how we handle it, and your right to refer it to the Financial Ombudsman Service.',
    priority: 0.3,
  },
  '/commission-disclosure/': {
    label: 'Commission disclosure',
    title: 'Commission disclosure | Creditplus',
    description:
      'How Creditplus is paid when we introduce you to a lender, and what that means for the cost of your finance.',
    priority: 0.3,
  },
};
