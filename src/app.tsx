import { GameProvider } from './contexts/game-context';
import GameBoard from './components/game-board';

function App() {
  return (
    <GameProvider>
      <GameBoard />
    </GameProvider>
  );
}

export default App;
