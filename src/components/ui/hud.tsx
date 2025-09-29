import { createMemo } from 'solid-js';

import Button from './button';
import { useGameState } from '../../contexts/game-context';

export default function HUD() {
  const gameContext = useGameState();

  const continueButtonText = createMemo(() => {
    if (!gameContext?.store.gameStarted) {
      return 'Enter Dungeon';
    } else if (gameContext?.store.deck.length === 0) {
      return 'Exit Dungeon';
    } else {
      return 'Next Room';
    }
  });

  return (
    <div class="flex justify-between border-b border-b-slate-200 bg-slate-100 p-4 max-sm:flex-col">
      <div class="flex gap-3">
        <Button
          onClick={() => {
            gameContext?.dealNewHand();
          }}
          disabled={!gameContext?.canDealNewHand()}
        >
          {continueButtonText()}
        </Button>
        <Button
          onClick={() => {
            gameContext?.skipCurrentHand();
          }}
          disabled={!gameContext?.canSkip()}
        >
          Skip Room
        </Button>
      </div>
      <div class="flex items-center gap-3">
        <span>Health Remaining: {gameContext?.store.health}</span>
        <span>Rooms Left: {gameContext?.roomsRemaining()}</span>
      </div>
    </div>
  );
}
