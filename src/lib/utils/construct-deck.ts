import { cardSuits, cardValues, Card } from '../classes/card';
import type { CardSuit } from '../classes/card';
import { shuffleCards } from './shuffle-cards';

const PLAYER_SUITS = new Set<CardSuit>(['hearts', 'diamonds']);

export function constructDeck(): Card[] {
  let cards: Card[] = [];

  // ensure no face cards or aces of hearts or diamonds are added to the deck
  for (const suit in cardSuits) {
    for (const value in cardValues) {
      const cardToAdd = new Card(cardSuits[suit], cardValues[value]);

      if (PLAYER_SUITS.has(cardToAdd.suit) && cardToAdd.value >= 11) continue;

      cards.push(cardToAdd);
    }
  }

  cards = shuffleCards(cards);

  return cards;
}
