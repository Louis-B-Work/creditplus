import test from 'node:test';
import assert from 'node:assert/strict';
import { calcHP, calcPCP, lookupApr, calculate, clamp } from '../assets/js/calc-core.js';

// Expected values come from a reference implementation of the same rates and formulas.

test('HP default: £10,000, £0 deposit, 48 months, excellent (10.9% APR)', () => {
  const apr = lookupApr('excellent', 10000);
  assert.equal(apr, 10.9);
  const r = calcHP({ price: 10000, deposit: 0, term: 48, apr });
  assert.equal(r.monthly, 255.51);
  assert.equal(r.costOfCredit, 2274.48);
  assert.equal(r.totalRepayable, 12274.48);
});

test('HP representative example: £12,000 over 60 months at 19.5% APR', () => {
  const r = calcHP({ price: 12000, deposit: 0, term: 60, apr: 19.5 });
  assert.equal(r.monthly, 304.38);
  assert.equal(r.costOfCredit, 6272.8);
  assert.equal(r.totalRepayable, 18272.8);
});

test('PCP default: £10,000, 48 months, 10.9% APR', () => {
  const r = calcPCP({ price: 10000, deposit: 0, term: 48, apr: 10.9 });
  assert.equal(r.finalPayment, 5500);
  assert.equal(r.monthly, 165.39);
  assert.equal(r.costOfCredit, 3273.33);
  assert.equal(r.totalRepayable, 13273.33);
});

test('PCP 60 months and poor credit', () => {
  const ok = calcPCP({ price: 10000, deposit: 0, term: 60, apr: 10.9 });
  assert.equal(ok.finalPayment, 4500);
  assert.equal(ok.monthly, 158.91);
  assert.equal(ok.totalRepayable, 13875.69);
  const poor = calcPCP({ price: 10000, deposit: 0, term: 60, apr: lookupApr('poor', 10000) });
  assert.equal(poor.monthly, 205.54);
  assert.equal(poor.costOfCredit, 6626.86);
});

test('HP with deposit: £25,000, £2,000 deposit, 36 months, poor credit (15.9% APR)', () => {
  const apr = lookupApr('poor', 25000);
  assert.equal(apr, 15.9);
  const r = calcHP({ price: 25000, deposit: 2000, term: 36, apr });
  assert.equal(r.monthly, 795.58);
  assert.equal(r.costOfCredit, 5650.88);
});

test('APR tiers follow the price band and credit profile', () => {
  assert.equal(lookupApr('excellent', 5000), 11.9);
  assert.equal(lookupApr('excellent', 25000), 9.9);
  assert.equal(lookupApr('excellent', 50000), 8.9);
  assert.equal(lookupApr('fair', 12000), 13.9);
  assert.equal(lookupApr('poor', 45000), 13.9);
  assert.equal(lookupApr('unknown', 12000), 19.9);
});

test('calculate() picks HP or PCP', () => {
  const input = { price: 10000, deposit: 0, term: 48, apr: 10.9 };
  assert.equal(calculate('hp', input).monthly, 255.51);
  assert.equal(calculate('pcp', input).monthly, 165.39);
});

test('invalid input throws', () => {
  for (const bad of [
    { price: 0, deposit: 0, term: 48, apr: 10.9 },
    { price: 10000, deposit: -1, term: 48, apr: 10.9 },
    { price: 10000, deposit: 10000, term: 48, apr: 10.9 },
    { price: 10000, deposit: 0, term: 40, apr: 10.9 },
    { price: 10000, deposit: 0, term: 48, apr: 0 },
    { price: NaN, deposit: 0, term: 48, apr: 10.9 },
  ]) {
    assert.throws(() => calcHP(bad), RangeError);
    assert.throws(() => calcPCP(bad), RangeError);
  }
});

test('clamp keeps values in range', () => {
  assert.equal(clamp(5, 0, 10), 5);
  assert.equal(clamp(-5, 0, 10), 0);
  assert.equal(clamp(50, 0, 10), 10);
});
