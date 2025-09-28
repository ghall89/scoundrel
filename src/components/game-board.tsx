import { For, Show } from 'solid-js';

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
          {(card) => (
            <button
              onClick={() => gameContext?.playSelectedCard(card.id)}
              class="m-4 w-fit transition-transform hover:scale-105"
            >
              <PlayingCard card={card} />
            </button>
          )}
        </For>
      </div>
      <div class="mt-10 flex justify-around text-center">
        <Show when={gameContext?.store.equippedCard}>
          <div>
            <span>Equipped</span>
            <PlayingCard card={gameContext?.store.equippedCard} />
          </div>
        </Show>
        <Show when={gameContext?.store.prevBeatCard}>
          <div>
            <span>Last Defeated</span>
            <PlayingCard card={gameContext?.store.prevBeatCard} />
          </div>
        </Show>
      </div>
    </>
  );
}
