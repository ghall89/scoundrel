import { test, expect } from 'bun:test';

import { Card } from '../src/lib/classes/card';

test('constructs with given suit and value and sets id', () => {
  const card = new Card('clubs', 4);

  expect(card.suit).toBe('clubs');
  expect(card.value).toBe(4);
  expect(card.id).toBe('clubs-4');
});

test('capitalizes the first letter of the suit', () => {
  const c = new Card('diamonds', 7);
  expect(c.capitalizeSuite()).toBe('Diamonds');
});

test('img getter returns correct filename', () => {
  const card = new Card('clubs', 5);

  expect(card.img).toEqual('cardClubs5.png');
});

test('maps 2–10 to their numeric string', () => {
  expect(new Card('hearts', 2).valueAsString()).toBe('2');
  expect(new Card('hearts', 10).valueAsString()).toBe('10');
});

test('maps 11-14 to J, Q, K, and A', () => {
  expect(new Card('hearts', 11).valueAsString()).toBe('J');
  expect(new Card('spades', 12).valueAsString()).toBe('Q');
  expect(new Card('spades', 13).valueAsString()).toBe('K');
  expect(new Card('hearts', 14).valueAsString()).toBe('A');
});
