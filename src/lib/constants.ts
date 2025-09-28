import type { CardSuit } from './types';

export const ENEMY_SUITS = new Set<CardSuit>(['clubs', 'spades']);
export const WEAPON_SUIT: CardSuit = 'diamonds' as const;
export const HEALING_SUIT: CardSuit = 'hearts' as const;

export const HAND_SIZE = 4 as const;
export const MIN_PLAYS = 3 as const;
export const MAX_HEALTH = 20 as const;
