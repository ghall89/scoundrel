import { Card } from '../../lib/classes/card';

interface PlayingCardProps {
  card?: Card;
}

export default function PlayingCard(props: PlayingCardProps) {
  return (
    <>
      {props.card ? (
        <img src={`/assets/cards/${props.card.img}`} />
      ) : (
        <span>Error</span>
      )}
    </>
  );
}
