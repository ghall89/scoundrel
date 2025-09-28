import type { SetStoreFunction } from 'solid-js/store';
import type { StoreType } from '../types';
import type { Card } from '../classes/card';

import {
  ENEMY_SUITS,
  WEAPON_SUIT,
  HEALING_SUIT,
  MAX_HEALTH,
} from '../constants';

export function handlePlay(
  currentHand: Card[],
  cardId: string,
  setStore: SetStoreFunction<StoreType>
) {
  const selectedCardIndex = currentHand.findIndex((card) => card.id === cardId);

  console.log(`Index: ${selectedCardIndex}`);

  if (selectedCardIndex === -1) {
    throw new Error(`Error: Card with ID of ${cardId} is not in hand.`);
  }

  const hand = [...currentHand];
  const [selectedCard] = hand.splice(selectedCardIndex, 1);

  switch (selectedCard.suit) {
    case 'clubs':
    case 'spades':
      setStore((state) => {
        // deal damage
        let health = state.health;

        health = health - selectedCard.value;

        return { ...state, health, hand };
      });
      break;
    case 'diamonds':
      setStore((state) => {
        return { ...state, hand };
      });
      break;
    case 'hearts':
      setStore((state) => {
        // heal damage
        let health = state.health + selectedCard.value;

        // ensure health never exceeds maximum
        if (health > MAX_HEALTH) {
          health = MAX_HEALTH;
        }

        return { ...state, health, hand };
      });
      break;
  }

  if (ENEMY_SUITS.has(selectedCard.suit)) {
  } else if (HEALING_SUIT === selectedCard.suit) {
  } else {
    //
  }
}
