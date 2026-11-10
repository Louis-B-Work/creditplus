import { pageHero, heading, faq, faqJsonLd, ctaBand, ctaStrip, applyButton, button, cards } from '../components.js';

export const financeFaqs = [
  {
    q: 'How much deposit do I need?',
    a: 'It depends on the lender, the car and your circumstances. Some agreements need no deposit, but a larger deposit reduces the amount you borrow and can improve your chances of acceptance.',
  },
  {
    q: 'How long can I borrow for?',
    a: 'Terms commonly run from one to five years, depending on the lender and the agreement type. A longer term lowers the monthly payment but increases the total interest you pay.',
  },
  {
    q: 'What happens at the end of a PCP?',
    a: 'You choose one of three options: pay the final amount (sometimes called the balloon payment) and keep the car, hand the car back, or part-exchange it towards another. Hand-back is subject to mileage and condition.',
  },
  {
    q: 'Can I settle my finance early?',
    a: 'In most cases, yes. You have a legal right to repay a regulated agreement early, and the lender can tell you the settlement figure. Check your credit agreement for details.',
  },
  {
    q: 'Does a missed payment affect my credit file?',
    a: 'It can. Lenders report to credit reference agencies, and missed or late payments may be recorded. If you think you will struggle to pay, speak to your lender early.',
  },
];

export const finance = () => `
${pageHero({
  title: 'Car finance, <span class="accent">explained.</span>',
  copy: 'Spreading the cost of a car can make it more affordable. Here is how the main options work, and what to expect when you apply.',
  slot: 'finance-hero',
  alt: 'A car salesman shaking hands with a customer in a bright dealership',
  secondary: { href: '/car-finance-calculator/', label: 'Calculate payments' },
})}

<section class="section-space">
  <div class="page-shell narrow">
    ${heading({ title: 'What is car finance?' })}
    <p>Car finance lets you pay for a vehicle over time instead of all at once. You choose the car, a lender pays the dealer, and you repay the lender in monthly instalments, plus interest.</p>
    <p>Creditplus is a credit broker, not a lender. We introduce you to lenders on our panel who may be able to offer you finance. All finance is subject to status and income.</p>
  </div>
</section>

<section class="section-space bg-mist" id="hp-vs-pcp">
  <div class="page-shell">
    ${heading({ title: 'Hire Purchase or PCP?', copy: 'Both spread the cost. The right choice depends on whether you want to own the car and how much you want to pay each month.', center: true })}
    <div class="table-wrap">
      <table class="compare">
        <thead><tr><th scope="col"><span class="sr-only">Feature</span></th><th scope="col">Hire Purchase (HP)</th><th scope="col">Personal Contract Purchase (PCP)</th></tr></thead>
        <tbody>
          <tr><th scope="row">Who owns the car?</th><td data-label="HP">You, once the final payment is made</td><td data-label="PCP">You, only if you pay the final amount</td></tr>
          <tr><th scope="row">Monthly payments</th><td data-label="HP">Usually higher, as you repay the full cost</td><td data-label="PCP">Usually lower, as some cost is deferred</td></tr>
          <tr><th scope="row">At the end</th><td data-label="HP">Car is yours, nothing more to pay</td><td data-label="PCP">Pay the final amount, return or part-exchange</td></tr>
          <tr><th scope="row">Mileage limits</th><td data-label="HP">None</td><td data-label="PCP">Yes, charges apply if exceeded</td></tr>
          <tr><th scope="row">Best if&hellip;</th><td data-label="HP">You want to keep the car long term</td><td data-label="PCP">You like to change car every few years</td></tr>
        </tbody>
      </table>
    </div>
  </div>
</section>

${ctaStrip()}

<section class="section-space" id="bad-credit">
  <div class="page-shell narrow">
    ${heading({ title: 'Car finance with less-than-perfect credit.', copy: 'A patchy credit history doesn&rsquo;t always rule you out. Different lenders look at different things.' })}
    <p>Our panel includes lenders who consider a range of credit situations, so it can be worth finding out what&rsquo;s available. Lenders typically look at your income, your outgoings, your credit history and how much you want to borrow.</p>
    <p>No lender can guarantee approval, and all finance is subject to status and affordability checks. If you are accepted, the rate offered may be higher than for someone with a stronger credit history.</p>
    <h3 class="type-h3">Ways to improve your chances</h3>
    <ul class="checks">
      <li>Check your credit file for errors and get them corrected</li>
      <li>Make sure you&rsquo;re on the electoral roll at your current address</li>
      <li>Consider a larger deposit, or a less expensive car</li>
      <li>Avoid making several credit applications in a short time</li>
      <li>Keep up with existing payments</li>
    </ul>
  </div>
</section>

<section class="section-space bg-mist">
  <div class="page-shell">
    ${heading({ title: 'What you&rsquo;ll need.', center: true })}
    ${cards(
      [
        { icon: '&#127380;', title: 'To be 18 or over', copy: 'And a UK resident.' },
        { icon: '&#128188;', title: 'Proof of income', copy: 'So the lender can check affordability.' },
        { icon: '&#127968;', title: 'Address history', copy: 'Usually the last three years.' },
        { icon: '&#128179;', title: 'Bank details', copy: 'For setting up your monthly Direct Debit.' },
      ],
      4,
    )}
  </div>
</section>

${ctaStrip()}

<section class="section-space">
  <div class="page-shell narrow">
    ${heading({ title: 'Common questions.', center: true })}
    ${faq(financeFaqs)}
  </div>
</section>
${faqJsonLd(financeFaqs)}
${ctaBand()}
`;
