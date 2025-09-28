import Button from './button';
import { useGameState } from '../contexts/game-context';

export default function HUD() {
  const gameContext = useGameState();

  return (
    <div class="flex justify-between border-b border-b-slate-200 bg-slate-100 p-4 max-sm:flex-col">
      <div class="flex gap-3">
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
      <div class="flex items-center gap-3">
        <span>Health Remaining: {gameContext?.store.health}</span>
        <span>Cards in Deck: {gameContext?.store.deck.length}</span>
        <span>Cards in Discard: {gameContext?.store.discard.length}</span>
      </div>
    </div>
  );
}
