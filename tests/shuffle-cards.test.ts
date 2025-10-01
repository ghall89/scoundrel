import { test, expect } from 'bun:test';
import { shuffleCards } from '../src/lib/utils/shuffle-cards';

import { Card } from '../src/lib/classes/card';

test('shuffles in place and returns same items', () => {
  const items: Card[] = [
    new Card('clubs', 4),
    new Card('diamonds', 2),
    new Card('hearts', 3),
    new Card('spades', 4),
  ];

  const originalIds = items.map((x) => x.id);

  const result = shuffleCards(items);

  expect(result).toBe(items);

  const resultIds = result.map((x) => x.id);
  expect(resultIds.sort()).toEqual(originalIds.slice().sort());
});
