import { Motion } from 'solid-motionone';

import { Card } from '../lib/classes/card';
import { useGameState } from '../contexts/game-context';

interface PlayingCardProps {
  card: Card;
}

export default function PlayingCard(props: PlayingCardProps) {
  const gameContext = useGameState();

  return (
    <Motion.div
      initial={{ scale: 1, opacity: 1 }}
      exit={{ scale: 1.4, opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => gameContext?.playSelectedCard(props.card.id)}
        class="m-4 w-fit transition-transform hover:scale-105"
      >
        <img src={`/assets/cards/${props.card.img}`} />
      </button>
    </Motion.div>
  );
}
