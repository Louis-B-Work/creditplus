import { calculate, lookupApr, clamp, gbp } from './calc-core.js';

const root = document.getElementById('calc');
const defaults = JSON.parse(root.dataset.defaults);
const APPLY = window.CP_APPLY_URL || 'https://apply.carfinance247.co.uk/';
const $ = (id) => document.getElementById(id);

const state = { term: defaults.term, type: defaults.type };
const price = { range: $('price'), num: $('price-num') };
const deposit = { range: $('deposit'), num: $('deposit-num') };
const score = $('score');
score.value = defaults.score;

const fill = (f) => {
  const r = f.range;
  r.style.setProperty('--fill', ((r.value - r.min) / (r.max - r.min)) * 100 + '%');
};

function wire(f, onChange) {
  f.range.addEventListener('input', () => {
    f.num.value = f.range.value;
    fill(f);
    onChange();
  });
  f.num.addEventListener('input', () => {
    const v = parseFloat(f.num.value);
    if (Number.isFinite(v)) {
      f.range.value = clamp(v, parseFloat(f.range.min), parseFloat(f.range.max));
      fill(f);
    }
    onChange();
  });
  f.num.addEventListener('blur', () => {
    const v = parseFloat(f.num.value);
    const c = clamp(Number.isFinite(v) ? v : parseFloat(f.range.min), parseFloat(f.range.min), parseFloat(f.range.max));
    f.num.value = c;
    f.range.value = c;
    fill(f);
    onChange();
  });
}

function render() {
  const err = root.querySelector('.calc-error');
  const p = parseFloat(price.num.value);
  const d = parseFloat(deposit.num.value) || 0;
  const apr = lookupApr(score.value, p);
  const pcp = state.type === 'pcp';

  let message = '';
  if (!Number.isFinite(p) || p <= 0) message = 'Please enter a vehicle price.';
  else if (d >= p) message = 'Your deposit needs to be less than the vehicle price.';
  err.hidden = !message;
  err.textContent = message;

  const links = document.querySelectorAll('#calc-result [data-apply], .calc-mini [data-apply]');
  if (message) {
    ['r-monthly', 'bar-monthly'].forEach((id) => ($(id).textContent = '—'));
    return;
  }

  const r = calculate(state.type, { price: p, deposit: d, term: state.term, apr });
  $('r-term').textContent = state.term;
  $('r-monthly').textContent = gbp(r.monthly);
  $('bar-monthly').textContent = gbp(r.monthly);
  $('r-apr').textContent = apr;
  $('mini-term').textContent = state.term;
  $('mini-apr').textContent = apr;
  $('r-apr2').textContent = apr + '%';
  $('r-price').textContent = gbp(p);
  $('r-deposit').textContent = gbp(d);
  $('r-credit').textContent = gbp(r.amountToFinance);
  $('r-final').textContent = gbp(r.finalPayment);
  $('r-interest').textContent = gbp(r.costOfCredit);
  $('r-total').textContent = gbp(r.totalRepayable);
  document.querySelectorAll('[data-pcp-only]').forEach((el) => (el.hidden = !pcp));
  document.querySelectorAll('[data-hp-only]').forEach((el) => (el.hidden = pcp));

  // Hand the figures over to the apply form.
  const href = `${APPLY}?amount=${p}&deposit=${d}&term=${state.term}&type=${state.type}`;
  links.forEach((a) => a.setAttribute('href', href));
}

// Deposit can never reach the price: keep its slider max just under the price.
function syncDepositMax() {
  const p = parseFloat(price.num.value);
  if (!Number.isFinite(p)) return;
  const max = Math.max(Math.floor((p - 500) / 100) * 100, 0);
  deposit.range.max = max;
  deposit.num.max = max;
  if (parseFloat(deposit.num.value) > max) {
    deposit.num.value = max;
    deposit.range.value = max;
  }
  fill(deposit);
}

wire(price, () => {
  syncDepositMax();
  render();
});
wire(deposit, render);
score.addEventListener('change', render);

root.querySelectorAll('[data-seg]').forEach((group) =>
  group.addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const name = group.dataset.seg;
    state[name] = name === 'term' ? parseInt(b.dataset.value, 10) : b.dataset.value;
    group.querySelectorAll('button').forEach((x) => x.setAttribute('aria-checked', x === b ? 'true' : 'false'));
    render();
  }),
);

[price, deposit].forEach(fill);
syncDepositMax();
render();
