import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
    const [state, setState] = useState(Array(9).fill(null));
    const [isXTurn, setIsXTurn] = useState(true);

    const checkWinner = (board) => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        
        // Check for draw
        if (!board.includes(null)) {
            return "draw";
        }
        
        return null;
    };

    const handleClick = (index) => {
        // If square is already filled or there's a winner, don't do anything
        if (state[index] || checkWinner(state)) {
            return;
        }
        
        const copyState = [...state];
        copyState[index] = isXTurn ? 'X' : 'O';
        setState(copyState);
        
        // Toggle player turn
        setIsXTurn(!isXTurn);
    };

    const resetGame = () => {
        setState(Array(9).fill(null));
        setIsXTurn(true);
    };

    const winner = checkWinner(state);
    let status;
    
    if (winner === "draw") {
        status = "Game ended in a draw!";
    } else if (winner) {
        status = `Winner: ${winner}`;
    } else {
        status = `Next player: ${isXTurn ? 'X' : 'O'}`;
    }

    return (
        <div className="board-container">
            <div className="status">{status}</div>
            <div className="board-row">
                <Square onClick={() => handleClick(0)} value={state[0]} />
                <Square onClick={() => handleClick(1)} value={state[1]} />
                <Square onClick={() => handleClick(2)} value={state[2]} />
            </div>
            <div className="board-row">
                <Square onClick={() => handleClick(3)} value={state[3]} />
                <Square onClick={() => handleClick(4)} value={state[4]} />
                <Square onClick={() => handleClick(5)} value={state[5]} />
            </div>
            <div className="board-row">
                <Square onClick={() => handleClick(6)} value={state[6]} />
                <Square onClick={() => handleClick(7)} value={state[7]} />
                <Square onClick={() => handleClick(8)} value={state[8]} />
            </div>
            {(winner || state.every(square => square !== null)) && (
                <button className="reset-button" onClick={resetGame}>
                    Play Again
                </button>
            )}
        </div>
    );
};

export default Board;