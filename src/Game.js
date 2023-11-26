import React, { useState } from 'react';
import Player from './player';
import HistoryPlayer from './historyPlayer';

const Game = () => {
  const [playersCount, setPlayersCount] = useState(2);
  const [players, setPlayers] = useState([]);
  const [winner, setWinner] = useState('');
  const [turn, setTurn] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const generateRandomNumber = () => Math.floor(Math.random() * 99) + 1;

  const handleAction = (action) => {
    const updatedPlayers = [...players];
    const currentPlayer = updatedPlayers[turn];

    if (currentPlayer.number === 100) return;

    switch (action) {
      case '+':
        currentPlayer.number += 1;
        break;
      case '-':
        currentPlayer.number -= 1;
        break;
      case '*':
        currentPlayer.number *= 2;
        break;
      case '/':
        currentPlayer.number = Math.floor(currentPlayer.number / 2);
        break;
      default:
        break;
    }

    if (currentPlayer.number === 100) {
      setWinner(` ${currentPlayer.name} Wins!`);
      currentPlayer.score +=1;
      setTurn(0);
      updatedPlayers.forEach((player) => {
        player.number = generateRandomNumber();
      
      });

      const getJson = JSON.parse(localStorage.getItem("usersGame")) || [];
      getJson.push((players))


      console.log(getJson);
      localStorage.setItem('usersGame', JSON.stringify(players))
    } else {
      setTurn((turn + 1) % playersCount);
    }

    setPlayers(updatedPlayers);
  };

  const startNewGame = () => {
    const newPlayers = [];
    for (let i = 0; i < playersCount; i++) {
      const playerName = window.prompt(`Enter Player ${i + 1} name:`) || `Player ${i + 1}`;
      newPlayers.push({
        name: playerName,
        number: generateRandomNumber(),
        score: 0,

      });
    }
    setPlayers(newPlayers);
    setWinner('');
    setTurn(0);
    setGameStarted(true);
  };

  const handlePlayerCountChange = (count) => {
    setPlayersCount(count);
  };

  return (
    <div className='root'>
      <h1>Get to 100</h1>
      {/* <HistoryPlayer/> */}
      {gameStarted ? (
        <div className='Players'>
     
          {players.map((player, index) => (

            <Player
              key={index}
              playerName={player.name}
              playerScore={player.score}
              number={player.number}
              handleAction={handleAction}
              isTurn={index === turn}
              currentPlayerName={players[turn].name}
            />
          ))}
          <div>
            <span>Winner is: {winner}</span><br />
            <button onClick={startNewGame}>Start New Game</button>

          </div>
        </div>
      ) : (
        <div>
          <span>Select number of players </span>
          <select value={playersCount} onChange={(e) => handlePlayerCountChange(e.target.value)}>
            {[2, 3, 4, 5, 6].map((count) => (
              <option key={count} value={count}>{count}</option>
            ))}
          </select>
          <button onClick={startNewGame}>Start Game</button>

        </div>
      )}
    </div>
  );
};

export default Game;
