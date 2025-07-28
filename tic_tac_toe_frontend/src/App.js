import React, { useState } from "react";
import "./App.css";

/**
 * PUBLIC_INTERFACE
 * Main App component for Tic Tac Toe game.
 * Provides 3x3 grid, two-player logic, status/winner display, and reset.
 */
function App() {
  // 'X' always starts first
  const [cells, setCells] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const winner = calculateWinner(cells);
  const isDraw = !winner && cells.every((cell) => cell !== null);

  // PUBLIC_INTERFACE
  function handleClick(idx) {
    if (cells[idx] || winner) return;
    const nextCells = cells.slice();
    nextCells[idx] = isXNext ? "X" : "O";
    setCells(nextCells);
    setIsXNext((prev) => !prev);
  }

  // PUBLIC_INTERFACE
  function handleReset() {
    setCells(Array(9).fill(null));
    setIsXNext(true);
  }

  // PUBLIC_INTERFACE
  function renderCell(idx) {
    return (
      <button
        className="ttt-cell"
        key={idx}
        onClick={() => handleClick(idx)}
        aria-label={`Cell ${idx + 1} ${cells[idx] ? cells[idx] : "empty"}`}
        disabled={!!cells[idx] || !!winner}
      >
        {cells[idx]}
      </button>
    );
  }

  let status;
  if (winner) {
    status = (
      <span className="ttt-winner">
        Winner: <b>{winner}</b>
      </span>
    );
  } else if (isDraw) {
    status = <span className="ttt-draw">It's a draw!</span>;
  } else {
    status = (
      <span>
        Next turn: <b>{isXNext ? "X" : "O"}</b>
      </span>
    );
  }

  return (
    <div className="ttt-app-bg">
      <div className="ttt-center-wrapper">
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <div className="ttt-status">{status}</div>
        <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
          {[0, 1, 2].map((row) => (
            <div className="ttt-row" key={row}>
              {[0, 1, 2].map((col) => renderCell(row * 3 + col))}
            </div>
          ))}
        </div>
        <button className="ttt-reset-btn" onClick={handleReset} aria-label="Restart game">
          Reset
        </button>
      </div>
      <footer className="ttt-footer">
        <span>
          Classic 3x3 Tic Tac Toe &mdash; Two Players
        </span>
      </footer>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Utility function to determine game winner
 * @param {Array} squares - Array of board cells
 * @returns {'X' | 'O' | null}
 */
function calculateWinner(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
