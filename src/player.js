import React, { useState } from 'react';

const Player = ({ playerName, playerScore, number, handleAction, isTurn, currentPlayerName }) => {
  const [action, setAction] = useState('');
  const [isActivePlayer, setIsActivePlayer] = useState(true);

  const handleClick = (buttonAction) => {
    if (isActivePlayer && isTurn) {
      handleAction(buttonAction);
      setAction(buttonAction);
    }
  };

  const exit = () => {
    setIsActivePlayer(false); 
  };

  return (
    <div className='key' style={{ display: isActivePlayer ? 'block' : 'none' }}>
     
      {isActivePlayer && (
        <div className="Player">
          <span className="Player-name">{playerName} Wins: {playerScore}</span>
          <div>
            <span className="Player-number"> Number: {number}</span>
          </div>
          <div className="Player-buttons">
            <button onClick={() => handleClick('+')} disabled={!isTurn || currentPlayerName !== playerName}>+</button>
            <button onClick={() => handleClick('-')} disabled={!isTurn || currentPlayerName !== playerName}>-</button>
            <button onClick={() => handleClick('*')} disabled={!isTurn || currentPlayerName !== playerName}>*</button>
            <button onClick={() => handleClick('/')} disabled={!isTurn || currentPlayerName !== playerName}>/</button>
          </div>
          {isTurn && action && <span>Last Action: {action}</span>}
          <button onClick={exit}>Exit</button>
        </div>
      )}
    </div>
  );
};

export default Player;
