import type { SetStoreFunction } from 'solid-js/store';
import type { StoreType } from '../types';
import type { Card } from '../classes/card';

import { MAX_HEALTH } from '../constants';

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
        let prevBeatCard = state.prevBeatCard;

        // deal damage
        let health = state.health;
        let damage = selectedCard.value as number;

        if (
          state.equippedCard &&
          (!prevBeatCard || prevBeatCard?.value > selectedCard.value)
        ) {
          damage = selectedCard.value - state.equippedCard.value;
          if (damage < 0) {
            damage = 0;
          }
          prevBeatCard = selectedCard;
        }

        health = health - damage;

        return {
          ...state,
          health,
          hand,
          prevBeatCard,
        };
      });
      break;
    case 'diamonds':
      setStore((state) => {
        if (state.equippedCard) {
          const discard = [...state.discard];
          discard.push(state.equippedCard);

          if (state.prevBeatCard) {
            discard.push(state.prevBeatCard);
          }
        }

        const equippedCard = selectedCard;

        return { ...state, hand, equippedCard, prevBeatCard: undefined };
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
}
