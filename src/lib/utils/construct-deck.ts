import { Card } from '../classes/card';

import { ENEMY_SUITS, CARD_SUITS, CARD_VALUES } from '../constants';

export function constructDeck(): Card[] {
  const cards: Card[] = [];

  // ensure no face cards or aces of hearts or diamonds are added to the deck
  for (const suit in CARD_SUITS) {
    for (const value in CARD_VALUES) {
      const cardToAdd = new Card(CARD_SUITS[suit], CARD_VALUES[value]);

      if (!ENEMY_SUITS.has(cardToAdd.suit) && cardToAdd.value >= 11) continue;

      cards.push(cardToAdd);
    }
  }

  return cards;
}
