import { For } from 'solid-js';

import { useGameState } from '../contexts/game-context';
import PlayingCard from './playing-card';
import HUD from './hud';

export default function GameBoard() {
  const gameContext = useGameState();

  return (
    <>
      <HUD />
      <div class="grid grid-cols-2 justify-items-center sm:grid-cols-4">
        <For each={gameContext?.store.hand}>
          {(card) => <PlayingCard card={card} />}
        </For>
      </div>
    </>
  );
}
