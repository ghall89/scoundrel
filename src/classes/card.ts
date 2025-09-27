// card.ts
export const cardSuits = ['clubs', 'diamonds', 'hearts', 'spades'] as const;
export type CardSuit = (typeof cardSuits)[number];

export const cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] as const;
export type CardValue = (typeof cardValues)[number];

export class Card {
  suit: CardSuit;
  value: CardValue;

  constructor(suit: CardSuit, value: CardValue) {
    this.suit = suit;
    this.value = value;
  }

  get img(): string {
    return `card${this.capitalizeSuite()}${this.valueAsString()}.png`;
  }
  capitalizeSuite(): string {
    return this.suit.charAt(0).toUpperCase() + this.suit.slice(1);
  }

  valueAsString(): string {
    switch (this.value) {
      case 11:
        return 'J';
      case 12:
        return 'Q';
      case 13:
        return 'J';
      case 14:
        return 'A';
      default:
        return this.value.toString();
    }
  }
}
