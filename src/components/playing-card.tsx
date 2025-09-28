import { Card } from '../lib/classes/card';
import { useGameState } from '../contexts/game-context';

interface PlayingCardProps {
  card: Card;
}

export default function PlayingCard(props: PlayingCardProps) {
  const gameContext = useGameState();

  return (
    <button
      onClick={() => gameContext?.playSelectedCard(props.card.id)}
      class="m-4 w-fit transition-transform hover:scale-105"
    >
      <img src={`/assets/cards/${props.card.img}`} />
    </button>
  );
}
