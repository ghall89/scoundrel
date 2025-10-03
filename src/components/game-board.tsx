import { For, Show, Switch, Match } from 'solid-js';

import { useGameState } from '../contexts/game-context';
import PlayingCard from './ui/playing-card';
import HUD from './ui/hud';
import TitleScreen from './title-screen';

export default function GameBoard() {
  const gameContext = useGameState();

  return (
    <main class="bg-cyan-500 text-white">
      <Switch fallback={<h1>There was a problem...</h1>}>
        <Match when={gameContext?.store.gameStarted}>
          <HUD />
          <div class="flex h-screen flex-col items-center justify-center">
            <div class="grid grid-cols-4 justify-items-center">
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
            <div class="mt-10 flex gap-3 text-center">
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
          </div>
        </Match>
        <Match when={!gameContext?.store.gameStarted}>
          <TitleScreen />
        </Match>
      </Switch>
    </main>
  );
}
