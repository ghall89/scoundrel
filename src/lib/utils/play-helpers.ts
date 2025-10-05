import type { StoreType } from '../types';
import { Card } from '../classes/card';

import { MAX_HEALTH } from '../constants';

export function takeDamage(state: StoreType, selectedCard: Card) {
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
    prevBeatCard,
    lastHandSkipped: false,
  };
}

export function equipCard(state: StoreType, selectedCard: Card) {
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
    equippedCard,
    prevBeatCard: undefined,
    discard,
    lastHandSkipped: false,
  };
}

export function restoreHealth(state: StoreType, selectedCard: Card) {
  // heal damage
  let health = state.health + selectedCard.value;

  // ensure health never exceeds maximum
  // unless its the final room (for scoring)
  if (health > MAX_HEALTH && state.deck.length > 0) {
    health = MAX_HEALTH;
  }

  return { ...state, health, lastHandSkipped: false };
}
