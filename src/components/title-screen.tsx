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
          <Modal label="How To Play">
            <div class="[&>p]:mb-2">
              <p>
                Scoundrel is a rogue-like dungeon crawler played with playing
                cards. Your goal is to make it through every room of the dungeon
                before you lose all your health.
              </p>
              <h2 class="font-bold">Rooms and Cards</h2>
              <p>
                Each room will contain 4 cards. You must play at least 3 of the
                shown cards before proceeding to the next room.
              </p>
              <p>
                Cards of the spade or club suits are enemies, and will deal
                damage to you based on their value. Face cards are valued at 11
                for Jacks, 12 for Queens, and 13 for Kings. Aces are valued at
                14.
              </p>
              <p>
                Cards of the diamond suit are your weapons, and they subtract
                their value from the damage dealt by enemies. However, they can
                only be used on an enemy of lesser value than the last enemy you
                defeated with that weapon, and you will take the full damage
                from any card of equal or greater value. For example, if you
                last defeated a 7 and subsequently choose to fight a 9, you will
                receieve 9 damage. You can always swap out your current weapon
                with a new one if one appears, and it will reset your last
                defeated card.
              </p>
              <p>
                Cards of the heart suit will heal you based on their value.
                However, your health can not exceed 20. You can play hearts if
                you are at full health, but nothing will happen.
              </p>
              <h2 class="font-bold">Skipping</h2>
              <p>
                If you haven't yet played any cards from the current room, you
                can opt to skip it. This will allow you to move to the next
                room, but will move the current room to the bottom of the deck.
              </p>
              <p>
                You can skip as many times as you'd like, as long as you did not
                skip the previous room.
              </p>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}
