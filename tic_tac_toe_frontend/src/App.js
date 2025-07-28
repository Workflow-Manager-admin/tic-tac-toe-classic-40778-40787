import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * The minimalistic Tic Tac Toe game UI with 3x3 grid, scoreboard, status display, and reset option.
 */
function App() {
  // State for 3x3 grid cells, 'X', 'O', or null
  const [board, setBoard] = useState(Array(9).fill(null));
  // State for current turn: true = X, false = O
  const [xIsNext, setXIsNext] = useState(true);
  // State for score: {X: <int>, O: <int>}
  const [score, setScore] = useState({ X: 0, O: 0 });
  // State for winner or draw status
  const [status, setStatus] = useState('');
  // State for if game over (winner or draw)
  const [gameOver, setGameOver] = useState(false);

  // PUBLIC_INTERFACE
  // Check for winner using board state
  function calculateWinner(cells) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, b, c] = line;
      if (
        cells[a] &&
        cells[a] === cells[b] &&
        cells[a] === cells[c]
      ) {
        return cells[a];
      }
    }
    return null;
  }

  // Effect: Update status whenever board/xIsNext changes
  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setStatus(`Winner: ${winner}`);
      setScore(sc => ({ ...sc, [winner]: sc[winner] + 1 }));
      setGameOver(true);
    } else if (board.every(c => c)) {
      setStatus("It's a draw!");
      setGameOver(true);
    } else {
      setStatus(`Turn: ${xIsNext ? 'X' : 'O'}`);
      setGameOver(false);
    }
    // eslint-disable-next-line
  }, [board]);

  // PUBLIC_INTERFACE
  // Handle click on cell
  function handleClick(idx) {
    if (board[idx] || gameOver) return;
    const nextBoard = board.slice();
    nextBoard[idx] = xIsNext ? 'X' : 'O';
    setBoard(nextBoard);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  // Reset the game (board and winner, but keep score)
  function handleReset() {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setStatus('');
    setGameOver(false);
  }

  // PUBLIC_INTERFACE
  // Reset the scoreboard (everything)
  function handleResetScore() {
    setScore({ X: 0, O: 0 });
    handleReset();
  }

  // Render: Board Cell
  const Cell = ({ value, onClick }) => (
    <button
      className="ttt-cell"
      onClick={onClick}
      aria-label={value ? `Cell ${value}` : "Empty cell"}
      disabled={!!value || gameOver}
      tabIndex={0}
    >
      {value}
    </button>
  );

  // Layout: minimal, centered, responsive
  return (
    <div className="ttt-app">
      <div className="ttt-outer-container">
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <div className="ttt-scoreboard">
          <span className="ttt-score-x">X: {score.X}</span>
          <span className="ttt-score-o">O: {score.O}</span>
        </div>
        <div className="ttt-status" aria-live="polite">{status}</div>
        <div className="ttt-board">
          {board.map((cell, idx) => (
            <Cell
              key={idx}
              value={cell}
              onClick={() => handleClick(idx)}
            />
          ))}
        </div>
        <div className="ttt-controls">
          <button className="ttt-btn" onClick={handleReset} aria-label="Reset game">
            Restart Game
          </button>
          <button className="ttt-btn ttt-btn-score" onClick={handleResetScore} aria-label="Reset scoreboard">
            Reset Score
          </button>
        </div>
        <div className="ttt-footer">
          <span>Classic 3x3 | Two Players</span>
        </div>
      </div>
    </div>
  );
}

export default App;
