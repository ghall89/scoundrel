import { createContext, useContext, type JSX } from 'solid-js';
import { createStore } from 'solid-js/store';

import { constructDeck } from '../lib/utils/construct-deck';
import { shuffleCards } from '../lib/utils/shuffle-cards';
import { Card } from '../lib/classes/card';

function useProviderValue() {
  const [store, setStore] = createStore<{
    deck: Card[];
    hand: Card[];
    discard: Card[];
  }>({
    deck: constructDeck(),
    hand: [],
    discard: [],
  });

  const shuffle = () =>
    setStore('deck', (prev) => {
      const shuffled = shuffleCards(prev.slice());
      return shuffled;
    });

  const dealNewHand = () => {
    setStore((state) => {
      const deck = state.deck;
      const hand: Card[] = [];
      const discard = [state.discard, ...state.hand];

      while (hand.length < 4 && deck.length >= 1) {
        const cardToAdd = deck.pop();

        hand.push(cardToAdd as Card);
      }

      return { ...state, deck, hand, discard };
    });
  };

  return { store, setStore, shuffle, dealNewHand };
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
