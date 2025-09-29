import {
  createContext,
  useContext,
  createMemo,
  createEffect,
  on,
  type JSX,
} from 'solid-js';
import { createStore } from 'solid-js/store';

import { constructDeck } from '../lib/utils/construct-deck';
import { shuffleCards } from '../lib/utils/shuffle-cards';
import { handlePlay } from '../lib/utils/handle-play';

import { HAND_SIZE, MIN_PLAYS } from '../lib/constants';
import { Card } from '../lib/classes/card';
import type { StoreType } from '../lib/types';

function useProviderValue() {
  const [store, setStore] = createStore<StoreType>({
    gameStarted: false,
    deck: [],
    hand: [],
    discard: [],
    lastHandSkipped: false,
    health: 20,
  });

  const canDealNewHand = createMemo(
    () => store.hand.length <= HAND_SIZE - MIN_PLAYS
  );

  const canSkip = createMemo(
    () => store.hand.length === HAND_SIZE && !store.lastHandSkipped
  );
  const roomsRemaining = createMemo(() =>
    Math.ceil(store.deck.length / HAND_SIZE)
  );

  createEffect(() => {
    if (store.health === 0 && store.gameStarted) {
      alert('You died!');
      setStore('gameStarted', false);
    }

    if (
      store.health >= 1 &&
      store.hand.length === 0 &&
      store.deck.length === 0 &&
      store.gameStarted
    ) {
      alert('You win!');
      setStore('gameStarted', false);
    }
  });

  // shuffle remaining cards in deck
  const shuffle = () =>
    setStore('deck', (prev) => {
      const shuffled = shuffleCards(prev.slice());
      return shuffled;
    });

  // discard remaining cards in hand, and draw a new hand
  const dealNewHand = () => {
    setStore((state) => {
      const deck = [...state.deck];
      const hand: Card[] = [];
      const discard = [...state.discard, ...state.hand];

      while (hand.length < HAND_SIZE && deck.length >= 1) {
        const cardToAdd = deck.pop();

        hand.push(cardToAdd as Card);
      }

      return { ...state, deck, hand, discard };
    });
  };

  // put current hand at the bottom of the deck and deal a new hand
  const skipCurrentHand = () => {
    // fallback to ensure a hand cannot be skipped if a card has been played
    if (store.hand.length !== HAND_SIZE) return;

    setStore((state) => {
      const deck = [...state.hand, ...state.deck];
      const hand: Card[] = [];

      return { ...state, deck, hand, lastHandSkipped: true };
    });

    dealNewHand();
  };

  // logic for playing selected card
  const playSelectedCard = (id: string) => handlePlay(store.hand, id, setStore);

  const startGame = () => {
    setStore('deck', constructDeck());
    dealNewHand();
    setStore('gameStarted', true);
  };

  return {
    store,
    setStore,
    shuffle,
    dealNewHand,
    playSelectedCard,
    skipCurrentHand,
    canDealNewHand,
    canSkip,
    roomsRemaining,
    startGame,
  };
}

export type ContextType = ReturnType<typeof useProviderValue>;

export const GameContext = createContext<ContextType | undefined>(undefined);

interface GameProviderProps {
  children: JSX.Element;
}

export function GameProvider(props: GameProviderProps) {
  const value = useProviderValue();

  return (
    <GameContext.Provider value={value}>{props.children}</GameContext.Provider>
  );
}

export function useGameState() {
  return useContext(GameContext);
}
