import { test, expect } from 'bun:test';

import {
  takeDamage,
  equipCard,
  restoreHealth,
} from '../src/lib/utils/play-helpers';

import { StoreType } from '../src/lib/types';

import { INITIAL_STATE } from '../src/lib/constants';
import { Card } from '../src/lib/classes/card';

test('player health lowered by value of enemy card, does not drop below 0', () => {
  const state: StoreType = {
    ...INITIAL_STATE,
    health: 12,
  };

  expect(takeDamage(state, new Card('clubs', 6)).health).toBe(6);
  expect(takeDamage(state, new Card('clubs', 8)).health).toBe(4);
  expect(takeDamage(state, new Card('clubs', 12)).health).toBe(0);
  expect(takeDamage(state, new Card('clubs', 14)).health).toBe(0);
});

test('players health lowered by the value of enemy card minus value of equipped card', () => {
  const state: StoreType = {
    ...INITIAL_STATE,
    health: 18,
    equippedCard: new Card('diamonds', 8),
  };

  expect(takeDamage(state, new Card('spades', 7)).health).toBe(18);
  expect(takeDamage(state, new Card('spades', 10)).health).toBe(16);
});

test('when combat resolves, the defeated card is added to prevBeatCard', () => {
  const state: StoreType = {
    ...INITIAL_STATE,
    equippedCard: new Card('diamonds', 12),
  };

  const card = new Card('clubs', 7);

  expect(takeDamage(state, card).prevBeatCard).toEqual(card);
});

test('when prevBeatCard exists, deal full damage only if current enemy card is equal to or higher than prevBeatCard', () => {
  const state: StoreType = {
    ...INITIAL_STATE,
    health: 18,
    equippedCard: new Card('diamonds', 11),
    prevBeatCard: new Card('clubs', 9),
  };

  expect(takeDamage(state, new Card('spades', 7)).health).toBe(18);
  expect(takeDamage(state, new Card('spades', 10)).health).toBe(8);
});

test('selected card is equipped', () => {
  const card = new Card('diamonds', 7);

  expect(equipCard(INITIAL_STATE, card).equippedCard).toEqual(card);
});

test('selected card replaces the eqipped card', () => {
  const state: StoreType = {
    ...INITIAL_STATE,
    equippedCard: new Card('diamonds', 10),
    prevBeatCard: new Card('clubs', 8),
  };

  const card = new Card('diamonds', 7);

  expect(equipCard(state, card).equippedCard).toEqual(card);
  expect(equipCard(state, card).prevBeatCard).toBeUndefined();
});

test('player health restored by value of the card, does not go above 20', () => {
  const state: StoreType = {
    ...INITIAL_STATE,
    health: 10,
  };

  expect(restoreHealth(state, new Card('hearts', 3)).health).toBe(13);
  expect(restoreHealth(state, new Card('hearts', 5)).health).toBe(15);
  expect(restoreHealth(state, new Card('hearts', 10)).health).toBe(20);
  expect(restoreHealth(state, new Card('hearts', 11)).health).toBe(20);
});
