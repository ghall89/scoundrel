import type { SetStoreFunction } from 'solid-js/store';
import type { StoreType } from '../types';
import type { Card } from '../classes/card';

import {
  MAX_HEALTH,
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
      setStore((state) => {
        let prevBeatCard = state.prevBeatCard;

        // deal damage
        let health = state.health;
        let damage = selectedCard.value as number;

        // combat logic if a weapon card is equipped
        if (
          state.equippedCard &&
          (!prevBeatCard || prevBeatCard?.value > selectedCard.value)
        ) {
          damage = selectedCard.value - state.equippedCard.value;

          // prevent negative damage
          if (damage < 0) {
            damage = 0;
          }

          prevBeatCard = selectedCard;
        }

        health = health - damage;

        // prevent health from going below 0
        if (health < 0) health = 0;

        return {
          ...state,
          health,
          hand,
          prevBeatCard,
        };
      });
      break;
    case WEAPON_SUIT:
      setStore((state) => {
        const discard = [...state.discard];

        if (state.equippedCard) {
          discard.push(state.equippedCard);
        }

        if (state.prevBeatCard) {
          discard.push(state.prevBeatCard);
        }

        const equippedCard = selectedCard;

        return {
          ...state,
          hand,
          equippedCard,
          prevBeatCard: undefined,
          discard,
        };
      });
      break;
    case HEALING_SUIT:
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
}
