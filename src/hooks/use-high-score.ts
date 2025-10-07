import { createSignal, onMount } from 'solid-js';

export function useHighScore() {
  const [highScore, setHighScore] = createSignal<number>(0);

  onMount(() => {
    const stored = Number(localStorage.getItem('high_score'));

    if (stored != null) {
      setHighScore(stored);
    }
  });

  const storeHighScore = (newScore: number) => {
    if (newScore > highScore()) {
      setHighScore(newScore);
      localStorage.setItem('high_score', newScore.toString());
    }
  };

  return { highScore, storeHighScore };
}
