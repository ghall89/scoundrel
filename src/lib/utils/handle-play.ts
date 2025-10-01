import type { SetStoreFunction } from 'solid-js/store';
import type { StoreType } from '../types';
import type { Card } from '../classes/card';

import { takeDamage, equipCard, restoreHealth } from './play-helpers';

import {
  HEALING_SUIT,
  WEAPON_SUIT,
  ENEMY_SUITS as enemySuitsSet,
} from '../constants';

const ENEMY_SUITS = Array.from(enemySuitsSet);

export function handlePlay(
  currentHand: Card[],
  cardId: string,
  setStore: SetStoreFunction<StoreType>
) {
  const selectedCardIndex = currentHand.findIndex((card) => card.id === cardId);

  if (selectedCardIndex === -1) {
    throw new Error(`Error: Card with ID of ${cardId} is not in hand.`);
  }

  const hand = [...currentHand];
  const [selectedCard] = hand.splice(selectedCardIndex, 1);

  switch (selectedCard.suit) {
    case ENEMY_SUITS[0]:
    case ENEMY_SUITS[1]:
      setStore((state) => takeDamage(state, selectedCard));
      break;
    case WEAPON_SUIT:
      setStore((state) => equipCard(state, selectedCard));
      break;
    case HEALING_SUIT:
      setStore((state) => restoreHealth(state, selectedCard));
      break;
  }

  setStore('hand', hand);
}
