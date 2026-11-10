import { pageHero, heading, faq, faqJsonLd, ctaBand, ctaStrip, applyButton, photo } from '../components.js';
import { calculatorDefaults as d } from '../site.js';

const calcFaqs = [
  {
    q: 'How accurate is the calculator?',
    a: 'It&rsquo;s an illustration based on the figures you enter. Your actual payment depends on the lender, the rate you are offered, and your circumstances, so treat it as a guide rather than a quote.',
  },
  {
    q: 'What is APR?',
    a: 'APR stands for Annual Percentage Rate. It&rsquo;s the yearly cost of borrowing, including interest and mandatory fees, shown as a percentage. The rate you&rsquo;re offered depends on your circumstances.',
  },
  {
    q: 'What is the PCP final payment?',
    a: 'On a PCP, part of the cost is deferred to a final amount at the end of the agreement. Paying it lets you keep the car. A bigger final payment means lower monthly payments, but you&rsquo;ll owe more at the end.',
  },
];

const slider = (id, label, min, max, step, value, prefix = '') => `
<div class="field" data-field="${id}">
  <div class="field-top">
    <label for="${id}">${label}</label>
    <span class="field-box">${prefix ? `<span>${prefix}</span>` : ''}<input id="${id}-num" type="number" inputmode="numeric" min="${min}" max="${max}" step="${step}" value="${value}" aria-label="${label}"></span>
  </div>
  <input id="${id}" type="range" min="${min}" max="${max}" step="${step}" value="${value}">
  <div class="field-range"><span>${prefix}${min.toLocaleString('en-GB')}</span><span>${prefix}${max.toLocaleString('en-GB')}</span></div>
</div>`;

const seg = (name, label, items, active) => `
<div class="field">
  <p class="field-label" id="${name}-label">${label}</p>
  <div class="seg seg--${items.length}" role="radiogroup" aria-labelledby="${name}-label" data-seg="${name}">
    ${items.map(([v, t]) => `<button type="button" role="radio" aria-checked="${v === active}" data-value="${v}">${t}</button>`).join('')}
  </div>
</div>`;

export const calculator = () => `
${pageHero({
  title: 'Car finance <span class="accent">calculator.</span>',
  copy: 'Find out how much you could borrow, and what it might cost each month. It&rsquo;s an illustration only, and it won&rsquo;t affect your credit score.',
  cta: false,
})}

<section class="section-space calc-section">
  <div class="page-shell">
    <div class="calc" id="calc" data-defaults='${JSON.stringify(d)}'>
      <div class="calc-mini">
        <p class="calc-mini-text"><span class="calc-mini-label"><span id="mini-term">48</span> payments of</span> <strong id="bar-monthly">&pound;0</strong> <span class="calc-mini-apr">at <span id="mini-apr">10.9</span>% APR</span></p>
        ${applyButton('btn--sm', 'calc-mini')}
      </div>
      <div class="calc-inputs card">
        <p class="fineprint calc-note">For illustration purposes only. The rate and payment you may be offered will be based on your individual circumstances.</p>
        ${slider('price', 'Vehicle price', 3000, 50000, 500, d.price, '&pound;')}
        ${slider('deposit', 'Deposit', 0, 49000, 100, d.deposit, '&pound;')}
        ${seg('term', 'Finance term (months)', [[24, '24'], [36, '36'], [48, '48'], [60, '60']], d.term)}
        <div class="field">
          <label class="field-label" for="score">Your credit profile</label>
          <select id="score">
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
          <p class="fineprint">Choose the band that best matches your credit history. Not sure? Pick Fair.</p>
        </div>
        ${seg('type', 'Type of finance', [['hp', 'HP (Hire Purchase)'], ['pcp', 'PCP']], d.type)}
        <p class="calc-error" role="alert" hidden></p>
      </div>

      <div class="calc-result" id="calc-result">
        <div class="card result-card" aria-live="polite">
          <p class="result-label"><span id="r-term">48</span> monthly payments of</p>
          <p class="result-figure" id="r-monthly">&pound;0</p>
          <p class="result-apr">at <strong id="r-apr">10.9</strong>% APR</p>
          ${applyButton('btn--lg btn--block', 'result')}
          <h3 class="breakdown-title">Breakdown</h3>
          <dl class="result-list">
            <div><dt>Vehicle price</dt><dd id="r-price">&pound;0</dd></div>
            <div><dt>Deposit</dt><dd id="r-deposit">&pound;0</dd></div>
            <div><dt>Amount to finance</dt><dd id="r-credit">&pound;0</dd></div>
            <div><dt>APR</dt><dd id="r-apr2">0%</dd></div>
            <div data-pcp-only hidden><dt>Optional final payment</dt><dd id="r-final">&pound;0</dd></div>
            <div data-hp-only><dt>Option-to-purchase fee</dt><dd>&pound;10</dd></div>
            <div><dt>Total cost of credit</dt><dd id="r-interest">&pound;0</dd></div>
            <div><dt>Total repayable</dt><dd id="r-total">&pound;0</dd></div>
          </dl>
          <p class="fineprint" data-pcp-only hidden>If you go over the agreed annual mileage on a PCP, you may need to pay excess mileage charges, which can vary between lenders.</p>
          <p class="fineprint">Credit is subject to status. Creditplus is a credit broker, not a lender. [Representative example to be supplied]</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section-space bg-mist">
  <div class="page-shell split">
    <div class="split-copy">
      ${heading({ title: 'What moves your payment.' })}
      <ul class="checks">
        <li><strong>Deposit:</strong> a bigger deposit means you borrow less.</li>
        <li><strong>Term:</strong> longer terms lower the monthly cost but increase the total cost of credit.</li>
        <li><strong>Credit profile:</strong> the better your credit history, the lower the rate you may be offered.</li>
        <li><strong>PCP:</strong> deferring part of the cost to a final payment lowers the monthly payment.</li>
      </ul>
    </div>
    <div class="split-media">${photo('calculator', 'A young couple leaning on a car while looking at their phones')}</div>
  </div>
</section>

${ctaStrip()}

<section class="section-space">
  <div class="page-shell narrow">
    ${heading({ title: 'About the calculator.', center: true })}
    ${faq(calcFaqs)}
  </div>
</section>
${faqJsonLd(calcFaqs)}
${ctaBand()}
`;
