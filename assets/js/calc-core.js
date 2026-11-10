// Pure calculator maths, shared by the page (calculator.js) and the tests.
//
// APR is a true annual rate: monthly rate = (1 + APR)^(1/12) - 1.
// Illustrative only: real rates depend on the customer and the lender.

export const GFV_RATES = { 24: 0.7, 36: 0.65, 48: 0.55, 60: 0.45 }; // PCP final payment as a share of vehicle price
export const OTP_FEE = 10; // HP option-to-purchase fee
export const TERMS = [24, 36, 48, 60];
export const SCORES = ['excellent', 'good', 'fair', 'poor'];

// [score, min price, max price, APR %]
const APR_TABLE = [
  ['excellent', 0, 7499.99, 11.9], ['excellent', 7500, 9999.99, 10.9], ['excellent', 10000, 14999.99, 10.9], ['excellent', 15000, 19999.99, 10.9],
  ['excellent', 20000, 29999.99, 9.9], ['excellent', 30000, 39999.99, 9.9], ['excellent', 40000, 49999.99, 9.9], ['excellent', 50000, 9999999, 8.9],
  ['good', 0, 7499.99, 11.9], ['good', 7500, 9999.99, 10.9], ['good', 10000, 14999.99, 10.9], ['good', 15000, 19999.99, 10.9],
  ['good', 20000, 29999.99, 9.9], ['good', 30000, 39999.99, 9.9], ['good', 40000, 49999.99, 9.9], ['good', 50000, 9999999, 8.9],
  ['fair', 0, 7499.99, 14.9], ['fair', 7500, 9999.99, 14.9], ['fair', 10000, 14999.99, 13.9], ['fair', 15000, 19999.99, 13.9],
  ['fair', 20000, 29999.99, 10.9], ['fair', 30000, 39999.99, 9.9], ['fair', 40000, 49999.99, 9.9], ['fair', 50000, 9999999, 8.9],
  ['poor', 0, 7499.99, 19.9], ['poor', 7500, 9999.99, 19.9], ['poor', 10000, 14999.99, 18.9], ['poor', 15000, 19999.99, 15.9],
  ['poor', 20000, 29999.99, 15.9], ['poor', 30000, 39999.99, 13.9], ['poor', 40000, 49999.99, 13.9], ['poor', 50000, 9999999, 13.9],
];

export function lookupApr(score, price) {
  for (const [s, min, max, apr] of APR_TABLE) if (s === score && price >= min && price <= max) return apr;
  return 19.9;
}

const round2 = (n) => Math.round(n * 100) / 100;
const monthlyRate = (apr) => Math.pow(1 + apr / 100, 1 / 12) - 1;

function check({ price, deposit, term, apr }) {
  if (!Number.isFinite(price) || price <= 0) throw new RangeError('price must be a positive number');
  if (!Number.isFinite(deposit) || deposit < 0 || deposit >= price) throw new RangeError('deposit must be zero or more and less than the price');
  if (!TERMS.includes(term)) throw new RangeError('term must be 24, 36, 48 or 60 months');
  if (!Number.isFinite(apr) || apr <= 0) throw new RangeError('apr must be above zero');
}

// Hire Purchase: level payments over the whole term, plus a one-off option-to-purchase fee.
export function calcHP(input) {
  check(input);
  const { price: a, deposit: d, term: n, apr } = input;
  const P = a - d;
  const r = monthlyRate(apr);
  const c = Math.pow(1 + r, n);
  const monthly = round2((P * r * c) / (c - 1));
  const totalRepayable = round2(monthly * n + d + OTP_FEE);
  return { monthly, totalRepayable, costOfCredit: round2(totalRepayable - a), finalPayment: 0, amountToFinance: P };
}

// PCP: lower payments with an optional final payment (GFV). The annuity uses n-1 periods,
// and only n-1 monthly payments are counted in the total.
export function calcPCP(input) {
  check(input);
  const { price: a, deposit: d, term: n, apr } = input;
  const P = a - d;
  const r = monthlyRate(apr);
  const c = Math.pow(1 + r, n);
  const cn1 = Math.pow(1 + r, n - 1);
  const finalPayment = round2(a * (GFV_RATES[n] ?? 0.2));
  const monthly = round2(((P - finalPayment / c) * r * cn1) / (cn1 - 1));
  const totalRepayable = round2(d + (n - 1) * monthly + finalPayment);
  return { monthly, totalRepayable, costOfCredit: round2(totalRepayable - a), finalPayment, amountToFinance: P };
}

export const calculate = (type, input) => (type === 'pcp' ? calcPCP(input) : calcHP(input));

export const gbp = (n, decimals = 2) =>
  new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(n);

export const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
