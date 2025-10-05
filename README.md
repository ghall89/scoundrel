# scoundrel

An implementation of Zach Gage's [Scoundrel](https://boardgamegeek.com/boardgame/191095/scoundrel). A solo, rogue-like card game.

Art from [Kenney Board Game Pack](https://kenney.nl/assets/boardgame-pack).

Icons by [FontAwesome](https://fontawesome.com/).

## How To Play

Scoundrel is a rogue-like dungeon crawler played with playing cards. Your goal is to make it through every room of the dungeon before you lose all your health.

### Rooms and Cards

Each room will contain 4 cards. You must play at least 3 of the shown cards before proceeding to the next room.

Cards of the spade or club suits are enemies, and will deal damage to you based on their value. Face cards are valued at 11 for Jacks, 12 for Queens, and 13 for Kings. Aces are valued at 14.

Cards of the diamond suit are your weapons, and they subtract their value from the damage dealt by enemies. However, they can only be used on an enemy of lesser value than the last enemy you defeated with that weapon, and you will take the full damage from any card of equal or greater value. For example, if you last defeated a 7 and subsequently choose to fight a 9, you will receieve 9 damage. You can always swap out your current weapon with a new one if one appears, and it will reset your last defeated card.

Cards of the heart suit will heal you based on their value. However, your health can not exceed 20, except in the final room. You can play hearts if you are at full health, but nothing will happen.

### Skipping

If you haven't yet played any cards from the current room, you can opt to skip it. This will allow you to move to the next room, but will move the current room to the bottom of the deck.

You can skip as many times as you'd like, however you cannot skip 2 rooms in a row.

## Usage

```bash
$ bun install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `bun run dev`

Runs the app in the development mode.<br>
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### `bun run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

Learn more about deploying your application with the [documentations](https://vite.dev/guide/static-deploy.html)
