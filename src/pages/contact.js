import { pageHero, heading, ctaBand, applyButton } from '../components.js';
import { company } from '../site.js';

export const contact = () => `
${pageHero({
  title: 'We&rsquo;re here <span class="accent">to help.</span>',
  copy: 'Whether you&rsquo;re after a new quote, have a question about an existing agreement or are a dealer, here&rsquo;s the best place to start.',
})}

<section class="section-space">
  <div class="page-shell">
    <div class="cards cols-3">
      <div class="card contact-card">
        <h3 class="type-h3">New quote</h3>
        <p>Ready to see your options? Start a quote online in a few minutes.</p>
        ${applyButton('btn--sm', 'contact')}
      </div>
      <div class="card contact-card" id="existing-customers">
        <h3 class="type-h3">Existing customers</h3>
        <p>For questions about an agreement you already have, contact your lender directly, using the details on your agreement.</p>
        <p class="placeholder-note">[Existing customer guidance to be supplied]</p>
      </div>
      <div class="card contact-card" id="dealers">
        <h3 class="type-h3">Dealers</h3>
        <p>Dealer enquiries and support.</p>
        <p class="placeholder-note">[Dealer contact details to be supplied]</p>
      </div>
    </div>
  </div>
</section>

<section class="section-space bg-mist">
  <div class="page-shell narrow">
    ${heading({ title: 'Get in touch.' })}
    <dl class="contact-list">
      <div><dt>Email</dt><dd>${company.email}</dd></div>
      <div><dt>Phone</dt><dd>${company.phone}</dd></div>
      <div><dt>Post</dt><dd>${company.address}</dd></div>
    </dl>
    <p class="fineprint">Please don&rsquo;t send personal or financial details by email.</p>
  </div>
</section>
${ctaBand()}
`;
