import { pageHero, heading, steps, cards, faq, faqJsonLd, ctaBand, ctaStrip, applyButton, textLink, photo } from '../components.js';

export const homeFaqs = [
  {
    q: 'Is Creditplus a lender?',
    a: 'No. Creditplus is a credit broker, not a lender. We introduce you to lenders on our panel who may be able to offer you finance.',
  },
  {
    q: 'What is the difference between HP and PCP?',
    a: 'With Hire Purchase (HP) you pay off the full cost of the car in fixed monthly payments and own it at the end. With a Personal Contract Purchase (PCP) your monthly payments are usually lower, and you choose at the end whether to pay a final amount to keep the car, hand it back, or part-exchange it.',
  },
  {
    q: 'Will checking my options affect my credit score?',
    a: 'Getting a quote to see your options is designed not to leave a mark on your credit file. If you go on to make a full application, the lender will carry out a credit check. [Compliance to confirm this wording]',
  },
  {
    q: 'Can I get car finance with bad credit?',
    a: 'Our panel includes lenders who consider a range of credit histories, so it can be worth checking. No one can guarantee approval, as all finance is subject to status, income and affordability checks.',
  },
  {
    q: 'Can I choose any car from any dealer?',
    a: 'In most cases, yes. You can choose a car from a UK dealer, subject to lender criteria such as the age and mileage of the vehicle.',
  },
  {
    q: 'Do I have to take the finance once I have a quote?',
    a: 'No. A quote carries no obligation. You only enter into an agreement when you read and sign the credit agreement with the lender.',
  },
];

export const home = () => `
${pageHero({
  title: 'The car you want, <span class="accent">finance that suits you.</span>',
  copy: 'The easy way to get the car you want, with finance that fits you. Choose any car from any UK dealer, and we&rsquo;ll help you find a way to pay for it.',
  align: 'left',
  slot: 'home-hero',
  alt: 'A grey estate car parked beside a winding road in a mountain valley',
  secondary: { href: '/car-finance-calculator/', label: 'Calculate payments' },
  wide: true,
  note: '<p class="hero-note"><span class="tick" aria-hidden="true">&#10003;</span> Checking your options is free and carries no obligation <!-- compliance: confirm --></p><p class="fineprint">Creditplus is a broker, not a lender. Finance is subject to status. [Representative example to be supplied]</p>',
})}

<section class="section-space" id="ways-to-pay">
  <div class="page-shell">
    ${heading({
      
      title: 'Two popular ways to finance a car.',
      copy: 'Here is how they differ.',
    })}
    <div class="two-up">
      <article class="card product-card">
        <div class="product-photo">${photo('hp', 'One hand passing a car key to another', { sizes: '(min-width: 1024px) 40vw, 100vw' })}</div>
        <div class="product-body">
          <h3 class="type-h3">Hire Purchase (HP)</h3>
          <p>Pay a deposit, then fixed monthly payments over an agreed term. Once the final payment is made, the car is yours.</p>
          <ul class="checks">
            <li>You own the car at the end</li>
            <li>Fixed monthly payments make budgeting simple</li>
            <li>No mileage limits</li>
          </ul>
          ${applyButton('btn--sm', 'card-hp')}
        </div>
      </article>
      <article class="card product-card">
        <div class="product-photo">${photo('pcp', 'A red electric car parked on a driveway among autumn trees', { sizes: '(min-width: 1024px) 40vw, 100vw' })}</div>
        <div class="product-body">
          <h3 class="type-h3">Personal Contract Purchase (PCP)</h3>
          <p>Lower monthly payments, with a final amount due at the end if you want to keep the car. Or hand it back or part-exchange it.</p>
          <ul class="checks">
            <li>Usually lower monthly payments than HP</li>
            <li>Choose at the end: keep, return or swap</li>
            <li>Agreed annual mileage applies</li>
          </ul>
          ${applyButton('btn--sm', 'card-pcp')}
        </div>
      </article>
    </div>
    <p class="note-line">Less-than-perfect credit? Read about <a href="/car-finance/#bad-credit">car finance with bad credit</a>.</p>
  </div>
</section>

<section class="section-space bg-dark">
  <div class="page-shell">
    ${heading({ title: 'Three steps to your next car.', center: true })}
    ${steps([
      { title: 'Start with a quick quote', copy: 'It&rsquo;s free and takes a few minutes. No hassle, no pressure, no obligation.' },
      { title: 'We look at your options', copy: 'We work with a panel of lenders to find finance that fits you.' },
      { title: 'Choose your car', copy: 'Pick any car from any UK dealer, then complete your agreement with the lender.' },
    ])}
    <div class="center">${applyButton('btn--lg', 'steps')}</div>
  </div>
</section>

<section class="section-space">
  <div class="page-shell split">
    <div class="split-media">${photo('calculator', 'A young couple leaning on a car while looking at their phones')}</div>
    <div class="split-copy">
      ${heading({
        
        title: 'See what finance could cost.',
        copy: 'Move the sliders to compare Hire Purchase and PCP for your budget. It&rsquo;s an illustration only, but it&rsquo;s a good place to start.',
      })}
      ${textLink('/car-finance-calculator/', 'Try the calculator')}
    </div>
  </div>
</section>

${ctaStrip()}

<section class="section-space bg-mist">
  <div class="page-shell">
    ${heading({ title: 'Finance without the faff.', center: true })}
    <!-- compliance: confirm each claim below -->
    ${cards([
      { icon: '&#9889;', title: 'Fast and simple', copy: 'Apply online in minutes, from wherever suits you.' },
      { icon: '&#128588;', title: 'No obligation', copy: 'Checking your options is free and commitment-free.' },
      { icon: '&#128663;', title: 'Any UK dealer', copy: 'You&rsquo;re free to choose the car and the dealer.' },
      { icon: '&#127974;', title: 'A panel of lenders', copy: 'We introduce you to lenders who may be able to help.' },
    ])}
  </div>
</section>

<section class="section-space">
  <div class="page-shell narrow">
    ${heading({ title: 'The questions we get asked most.', center: true })}
    ${faq(homeFaqs)}
  </div>
</section>
${faqJsonLd(homeFaqs)}
${ctaBand()}
`;
