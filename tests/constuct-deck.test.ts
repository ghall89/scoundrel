import { test, expect } from 'bun:test';
import { constructDeck } from '../src/lib/utils/construct-deck';

import { ENEMY_SUITS, CARD_VALUES } from '../src/lib/constants';

test('deck has the correct number of cards', () => {
  const deck = constructDeck();

  expect(deck).toBeArrayOfSize(44);
});

test('non-enemy suits do not include values >= 11', () => {
  const deck = constructDeck();
  for (const card of deck) {
    if (!ENEMY_SUITS.has(card.suit)) {
      expect(card.value).toBeLessThan(11);
    }
  }
});

test('each enemy suit has all values', () => {
  const deck = constructDeck();
  const totalValues = Object.values(CARD_VALUES).length;

  for (const suit in ENEMY_SUITS.values) {
    const countForSuit = deck.filter((c) => c.suit === suit).length;
    expect(countForSuit).toBe(totalValues);
  }
});
