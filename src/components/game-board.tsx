import { For } from 'solid-js';

import { useGameState } from '../contexts/game-context';
import PlayingCard from './playing-card';
import Button from './button';

export default function GameBoard() {
  const gameContext = useGameState();

  return (
    <>
      <div class="flex justify-between">
        <div>
          <Button
            onClick={() => {
              gameContext?.dealNewHand();
            }}
            disabled={!gameContext?.canDealNewHand()}
          >
            Deal
          </Button>
          <Button
            onClick={() => {
              gameContext?.skipCurrentHand();
            }}
            disabled={!gameContext?.canSkip()}
          >
            Skip
          </Button>
        </div>
        <div class="flex gap-3 p-4">
          <span>Cards in Deck: {gameContext?.store.deck.length}</span>
          <span>Cards in Discard: {gameContext?.store.discard.length}</span>
        </div>
      </div>
      <div class="grid grid-cols-4">
        <For each={gameContext?.store.hand}>
          {(card) => <PlayingCard card={card} />}
        </For>
      </div>
    </>
  );
}
