import { Card } from '../classes/card';

interface PlayingCardProps {
  card: Card;
}

export default function PlayingCard(props: PlayingCardProps) {
  return (
    <img
      class="m-4 transition-transform hover:scale-105"
      src={`/assets/cards/${props.card.img}`}
    />
  );
}
