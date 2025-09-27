import { cardSuits, cardValues, Card } from './card';
import type { CardSuit } from './card';

const PLAYER_SUITS = new Set<CardSuit>(['hearts', 'diamonds']);

export class Deck {
  cardsInDeck: Card[];

  constructor() {
    this.cardsInDeck = this.constructDeck();
    this.shuffle();
  }

  private constructDeck(): Card[] {
    const cards: Card[] = [];

    // ensure no face cards or aces of hearts or diamonds are added to the deck

    for (const suit in cardSuits) {
      for (const value in cardValues) {
        const cardToAdd = new Card(cardSuits[suit], cardValues[value]);

        if (PLAYER_SUITS.has(cardToAdd.suit) && cardToAdd.value >= 11) continue;

        cards.push(cardToAdd);
      }
    }

    return cards;
  }

  shuffle() {
    const arr = this.cardsInDeck.slice();

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    this.cardsInDeck = arr;
  }

  deal(): Card[] {
    const newHand: Card[] = [];

    while (newHand.length < 4 && this.cardsInDeck.length >= 1) {
      const cardToAdd = this.cardsInDeck.pop();

      newHand.push(cardToAdd as Card);
    }

    return newHand;
  }

  insert(toInsert: Card | Card[]) {
    if (Array.isArray(toInsert)) {
      this.cardsInDeck.push(...toInsert);
    } else {
      this.cardsInDeck.push(toInsert);
    }
  }

  reset() {
    this.cardsInDeck = this.constructDeck();
  }
}
