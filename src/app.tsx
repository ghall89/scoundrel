import { For } from 'solid-js';

import { Deck } from './classes/deck';
import PlayingCard from './components/playing-card';

function App() {
  const deck = new Deck();

  console.log(deck.cardsInDeck);

  return (
    <div class="grid grid-cols-4">
      <For each={deck.cardsInDeck}>{(card) => <PlayingCard card={card} />}</For>
    </div>
  );
}

export default App;
