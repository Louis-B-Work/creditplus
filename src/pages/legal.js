import { legalBanner, ctaBand } from '../components.js';
import { company } from '../site.js';

const page = (title, intro, sections) => `
<section class="page-title-band"><div class="page-shell narrow"><h1 class="type-h1">${title}</h1><p class="type-lead">${intro}</p></div></section>
<section class="section-space"><div class="page-shell narrow legal-doc">
${legalBanner()}
${sections.map(([h, body]) => `<h2 class="type-h3">${h}</h2>${body}`).join('\n')}
<p class="fineprint">Questions? Contact us at ${company.email} or write to ${company.address}.</p>
</div></section>
${ctaBand()}`;

const ul = (items) => `<ul class="checks">${items.map((i) => `<li>${i}</li>`).join('')}</ul>`;

export const privacy = () =>
  page('Privacy policy', 'How we collect, use and protect your personal information.', [
    ['Who we are', `<p>${company.name} is a credit broker. [Legal entity name, company number and registered address to be supplied.] We are the controller of the personal information described in this policy.</p>`],
    ['Information we collect', ul(['Contact details you give us, such as name, email address and phone number', 'Information you provide when you ask about finance', 'Technical information about how you use this website, if analytics are enabled [to be confirmed]'])],
    ['How we use it', `<p>We use your information to respond to you, to introduce you to lenders, to meet legal and regulatory obligations, and to improve our service.</p>`],
    ['Lawful basis', '<p>[Compliance to confirm lawful bases: contract, legitimate interests, legal obligation, consent.]</p>'],
    ['Who we share it with', `<p>We may share your information with lenders on our panel, credit reference agencies and service providers acting on our behalf. When you apply, the lender&rsquo;s own privacy policy also applies.</p>`],
    ['How long we keep it', '<p>[Retention periods to be supplied.]</p>'],
    ['Your rights', ul(['To access the information we hold about you', 'To ask us to correct or delete it', 'To object to or restrict how we use it', 'To data portability', 'To withdraw consent where we rely on it']) + '<p>You can complain to the Information Commissioner&rsquo;s Office (ico.org.uk) if you are unhappy with how we handle your data.</p>'],
    ['Changes', '<p>We may update this policy from time to time. The latest version will always be on this page.</p>'],
  ]);

export const cookies = () =>
  page('Cookie policy', 'What cookies this website uses and how you can control them.', [
    ['What are cookies?', '<p>Cookies are small files stored on your device when you visit a website. They help sites work and can tell the site owner how it is used.</p>'],
    ['What we use', '<p>[Compliance to confirm. At launch this site is intended to use only essential cookies and no analytics or advertising cookies. If that changes, this page will be updated and we will ask for your consent where required.]</p>'],
    ['Third-party content', '<p>The fonts on this site are served from our own domain, so your browser does not contact a font provider. Links to other sites, such as the application form, are covered by their own policies.</p>'],
    ['Controlling cookies', '<p>You can delete or block cookies in your browser settings. Doing so may affect how some sites work.</p>'],
  ]);

export const terms = () =>
  page('Terms and conditions', 'The terms for using this website.', [
    ['Our role', `<p>${company.name} is a credit broker, not a lender. We introduce you to lenders on our panel who may be able to offer you finance. [Regulatory status wording to be supplied.]</p>`],
    ['Information, not advice', '<p>The content on this site, including the calculator, is for general information and illustration only. It is not financial advice.</p>'],
    ['The calculator', '<p>Calculator results are estimates based on the figures you enter. They are not a quote or an offer of finance. Your actual rate and payments depend on your circumstances and the lender&rsquo;s criteria.</p>'],
    ['No guarantee of finance', '<p>All finance is subject to status and income. Applicants must be 18 or over. Nothing on this site guarantees that you will be accepted.</p>'],
    ['Intellectual property', '<p>The content, design and logos on this site belong to us or our licensors. Photography is used under licence from third parties.</p>'],
    ['Liability', '<p>[Liability and governing-law wording to be supplied by a legal professional.]</p>'],
  ]);

export const complaints = () =>
  page('Complaints', 'If something has gone wrong, we want to hear about it.', [
    ['How to complain', `<p>You can complain by email to ${company.email}, by phone on ${company.phone}, or in writing to ${company.address}. Please include your name, contact details and what the complaint is about.</p>`],
    ['What happens next', '<p>[Compliance to supply the complaints handling process and timescales: acknowledgement, final response and escalation.]</p>'],
    ['The Financial Ombudsman Service', '<p>If you are not happy with our final response, or we have not responded within eight weeks, you may be able to refer your complaint to the Financial Ombudsman Service, free of charge. [Confirm wording and contact details: financial-ombudsman.org.uk.]</p>'],
    ['Complaints about your lender', '<p>If your complaint is about a lender&rsquo;s service or your finance agreement, contact the lender directly using the details in your agreement.</p>'],
  ]);

export const commission = () =>
  page('Commission disclosure', 'How we are paid when we introduce you to a lender.', [
    ['How we are paid', '<p>When we introduce you to a lender and you enter into an agreement, we receive commission from the lender. This can be a fixed fee or a percentage of the amount you borrow. [Compliance to supply exact wording.]</p>'],
    ['Does it cost me more?', '<p>[Compliance to confirm. Commission is paid by the lender, and any effect on the cost of your finance must be explained clearly here.]</p>'],
    ['Different lenders pay different amounts', '<p>The lenders we work with may pay commission at different rates. We will tell you about our commission before you commit to an agreement, and you can ask us for more information at any time.</p>'],
  ]);
