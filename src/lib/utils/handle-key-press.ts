import type { ContextType } from '../../contexts/game-context';

export default function handleKeyPress(e: KeyboardEvent, context: ContextType) {
  const activeElement = document.activeElement;
  const activeElementIndex = context.store.hand.findIndex(
    (el) => el.id === activeElement?.id
  );

  let nextElementIndex: number = -1;

  switch (e.key) {
    case 'ArrowLeft':
      // select previous card
      if (activeElementIndex === -1 || activeElementIndex === 0) {
        nextElementIndex = context.store.hand.length - 1;
      } else {
        nextElementIndex = activeElementIndex - 1;
      }

      document
        .getElementById(context.store.hand[nextElementIndex]?.id)
        ?.focus();
      break;
    case 'ArrowRight':
      // select next card
      if (
        activeElementIndex === -1 ||
        activeElementIndex === context.store.hand.length - 1
      ) {
        nextElementIndex = 0;
      } else {
        nextElementIndex = activeElementIndex + 1;
      }

      document
        .getElementById(context.store.hand[nextElementIndex]?.id)
        ?.focus();
      break;
    case 's':
      // skip current hand
      if (context.canSkip()) {
        context.skipCurrentHand();
      }
      break;
    case 'n':
      // skip current hand
      if (context.canDealNewHand()) {
        context.dealNewHand();
      }
      break;
  }
}
