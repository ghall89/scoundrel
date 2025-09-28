import type { Card } from '../classes/card';

export function shuffleCards(cards: Card[]): Card[] {
  // fisher-yates shuffle
  let m = cards.length,
    t,
    i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = cards[m];
    cards[m] = cards[i];
    cards[i] = t;
  }

  return cards;
}
