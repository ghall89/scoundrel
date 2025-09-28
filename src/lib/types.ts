import { Card } from './classes/card';

export const cardSuits = ['clubs', 'diamonds', 'hearts', 'spades'] as const;
export type CardSuit = (typeof cardSuits)[number];

export const cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] as const;
export type CardValue = (typeof cardValues)[number];

export interface StoreType {
  deck: Card[];
  hand: Card[];
  discard: Card[];
  lastHandSkipped: boolean;
  health: number;
  equippedCard?: Card;
  prevBeatCard?: Card;
}
