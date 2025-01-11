import { useState } from "react";
import { solveSudoku } from "./utils/sudokuSolver";

function App() {
  // Initialize board with some numbers filled and others as 0 (empty)
  const [board, setBoard] = useState(
    Array(9).fill().map(() => Array(9).fill(0))
  );

  // Update the board when a user enters a number
  const handleInputChange = (e, row, col) => {
    const value = e.target.value;
    if (value === "" || /^[1-9]$/.test(value)) {
      const newBoard = [...board];  // Create a shallow copy of the board
      newBoard[row] = [...board[row]];  // Create a new row copy to avoid mutation
      newBoard[row][col] = value ? parseInt(value, 10) : 0;
      setBoard(newBoard);
    }
  };

  // Solve the Sudoku puzzle when the user clicks 'Solve'
  const handleSolve = () => {
    const newBoard = board.map(row => [...row]);  // Deep copy of the board
    solveSudoku(newBoard);
    setBoard(newBoard);  // Update state with the solved board
  };

  return (
    <div className="App flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-xs bg-white p-6 rounded shadow-lg">
        <h1 className="text-xl font-semibold mb-4 text-center">Sudoku Solver</h1>
        <div className="grid grid-cols-9 gap-1">
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <input
                key={`${rowIndex}-${colIndex}`}
                type="text"
                value={cell === 0 ? "" : cell}
                onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                className="w-12 h-12 text-center border border-gray-300 rounded"
                maxLength="1"
              />
            ))
          )}
        </div>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleSolve}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Solve
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
