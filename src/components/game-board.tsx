import { For, useContext } from 'solid-js';

import { GameContext } from '../contexts/game-context';
import PlayingCard from './playing-card';
import Button from './button';

export default function GameBoard() {
  const gameContext = useContext(GameContext);

  return (
    <>
      <div class="flex justify-between">
        <Button
          onClick={() => {
            gameContext?.dealNewHand();
          }}
        >
          Deal
        </Button>
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
