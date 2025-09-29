import { createSignal } from 'solid-js';

import Button from './ui/button';
import { useGameState } from '../contexts/game-context';

import Modal from './ui/modal';

export default function TitleScreen() {
  const gameContext = useGameState();

  const [modalOpen, setModalOpen] = createSignal(false);

  return (
    <>
      <div class="flex h-screen flex-col items-center justify-center gap-10">
        <div class="text-center">
          <h1 class="text-4xl font-bold uppercase">Scoundrel</h1>
          <h2 class="text-xl">Based on the game designed by Zach Gage.</h2>
        </div>
        <div class="flex gap-4">
          <Button onClick={() => gameContext?.startGame()}>
            Enter Dungeon
          </Button>
          <Button onClick={() => setModalOpen(true)}>How To Play</Button>
        </div>
      </div>
      <Modal open={modalOpen} setOpen={setModalOpen}>
        <span>Hello Modal!</span>
      </Modal>
    </>
  );
}
