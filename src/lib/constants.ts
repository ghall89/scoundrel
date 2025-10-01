import type { CardSuit, StoreType } from './types';
import { constructDeck } from './utils/construct-deck';

export const CARD_VALUES = [
  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
] as const;
export const CARD_SUITS = ['clubs', 'diamonds', 'hearts', 'spades'] as const;

export const ENEMY_SUITS = new Set<CardSuit>(['clubs', 'spades']);
export const WEAPON_SUIT: CardSuit = 'diamonds' as const;
export const HEALING_SUIT: CardSuit = 'hearts' as const;

export const HAND_SIZE = 4 as const;
export const MIN_PLAYS = 3 as const;
export const MAX_HEALTH = 20 as const;

export const INITIAL_STATE: StoreType = {
  gameStarted: true,
  deck: constructDeck(),
  hand: [],
  discard: [],
  lastHandSkipped: false,
  health: MAX_HEALTH,
  equippedCard: undefined,
  prevBeatCard: undefined,
};
