import { Card } from './classes/card';
import { CARD_SUITS, CARD_VALUES } from './constants';

export type CardSuit = (typeof CARD_SUITS)[number];

export type CardValue = (typeof CARD_VALUES)[number];

export interface StoreType {
  gameStarted: boolean;
  deck: Card[];
  hand: Card[];
  discard: Card[];
  lastHandSkipped: boolean;
  health: number;
  equippedCard?: Card;
  prevBeatCard?: Card;
}
