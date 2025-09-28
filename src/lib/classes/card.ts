import type { CardSuit, CardValue } from '../types';

export class Card {
  id: string;
  suit: CardSuit;
  value: CardValue;

  constructor(suit: CardSuit, value: CardValue) {
    this.id = `${suit}-${value}`;
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
