import React, { useState } from 'react';
import Game from './components/Game';
import Welcome from './components/Welcome';

function App() {
  const [startGame, setStartGame] = useState(false);
  console.log(startGame);

  return (
    <div>
      {startGame ? <Game /> : <Welcome setStartGame={setStartGame} />}
    </div>
  );
}

export default App;
