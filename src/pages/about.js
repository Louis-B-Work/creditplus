import { pageHero, heading, cards, ctaBand, ctaStrip, applyButton, photo } from '../components.js';
import { company } from '../site.js';

export const about = () => `
${pageHero({
  title: 'Finance that fits, <span class="accent">found simply.</span>',
  copy: 'Creditplus is a car finance broker. We help drivers explore their options and get introduced to lenders who may be able to help.',
  slot: 'about-hero',
  alt: 'Four smiling colleagues gathered around a laptop',
})}

<section class="section-space">
  <div class="page-shell split">
    <div class="split-copy">
      ${heading({ title: 'A broker, not a lender.' })}
      <p>Creditplus doesn&rsquo;t lend money itself. We act as a credit broker: you tell us about the car you want and what you can afford, and we introduce you to lenders on our panel who may be able to offer you finance.</p>
      <p>Because we work with more than one lender, we can look at a range of options for you rather than a single deal.</p>
      <!-- compliance: confirm company background, years trading and any figures before adding -->
    </div>
    <div class="split-media">${photo('finance-hero', 'A car salesman shaking hands with a customer in a bright dealership')}</div>
  </div>
</section>

<section class="section-space bg-mist">
  <div class="page-shell narrow">
    ${heading({ title: 'Working with a panel of lenders.', center: true })}
    <p class="center-text">We work with a panel of lenders who offer Hire Purchase and PCP finance. When you choose to get a quote, you&rsquo;ll be taken to a short online application, where you can see what may be available.</p>
    <div class="center">${applyButton('btn--lg', 'about')}</div>
  </div>
</section>

<section class="section-space">
  <div class="page-shell">
    ${heading({ title: 'How we like to work.', center: true })}
    ${cards(
      [
        { icon: '&#128161;', title: 'Clear and simple', copy: 'Plain English, no jargon, and no surprises.' },
        { icon: '&#129309;', title: 'Fair to everyone', copy: 'Whatever your credit history, you deserve a straight answer.' },
        { icon: '&#128274;', title: 'Open about how we are paid', copy: 'We tell you about commission before you commit.' },
        { icon: '&#127942;', title: 'Here to help', copy: 'Support from real people when you need it.' },
      ],
      4,
    )}
    <p class="center-text"><a href="/commission-disclosure/">How we&rsquo;re paid</a></p>
  </div>
</section>
${ctaBand()}
`;
