import { Card } from '../classes/card';
import { cardSuits, cardValues } from '../types';
import { shuffleCards } from './shuffle-cards';

import { ENEMY_SUITS } from '../constants';

export function constructDeck(): Card[] {
  let cards: Card[] = [];

  // ensure no face cards or aces of hearts or diamonds are added to the deck
  for (const suit in cardSuits) {
    for (const value in cardValues) {
      const cardToAdd = new Card(cardSuits[suit], cardValues[value]);

      if (!ENEMY_SUITS.has(cardToAdd.suit) && cardToAdd.value >= 11) continue;

      cards.push(cardToAdd);
    }
  }

  cards = shuffleCards(cards);

  return cards;
}
