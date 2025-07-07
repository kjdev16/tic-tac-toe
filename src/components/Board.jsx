import React, { useState, useEffect } from "react";
import Square from "./Square.jsx";

const Board = ({ onGameEnd }) => {
    const [state, setState] = useState(Array(9).fill(null));
    const [isXTurn, setIsXTurn] = useState(true);
    const [winningSquares, setWinningSquares] = useState([]);
    const [gameEnded, setGameEnded] = useState(false);

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
                return { winner: board[a], winningPattern: pattern };
            }
        }
        
        // Check for draw
        if (!board.includes(null)) {
            return { winner: "draw", winningPattern: [] };
        }
        
        return { winner: null, winningPattern: [] };
    };

    const handleClick = (index) => {
        // If square is already filled or there's a winner, don't do anything
        if (state[index] || gameEnded) {
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
        setWinningSquares([]);
        setGameEnded(false);
    };

    useEffect(() => {
        const result = checkWinner(state);
        if (result.winner && !gameEnded) {
            setWinningSquares(result.winningPattern);
            setGameEnded(true);
            onGameEnd(result.winner);
        }
    }, [state, gameEnded, onGameEnd]);

    const result = checkWinner(state);
    const winner = result.winner;
    let status;
    let statusClass = "";
    
    if (winner === "draw") {
        status = "🤝 It's a Draw!";
        statusClass = "draw";
    } else if (winner) {
        status = `🎉 Player ${winner} Wins!`;
        statusClass = "winner";
    } else {
        status = `${isXTurn ? '❌' : '⭕'} Player ${isXTurn ? 'X' : 'O'}'s Turn`;
    }

    return (
        <div className="board-container">
            <div className={`status ${statusClass}`}>{status}</div>
            <div className="board">
                {state.map((value, index) => (
                    <Square
                        key={index}
                        onClick={() => handleClick(index)}
                        value={value}
                        isWinning={winningSquares.includes(index)}
                    />
                ))}
            </div>
            {gameEnded && (
                <button className="reset-button" onClick={resetGame}>
                    🎮 Play Again
                </button>
            )}
        </div>
    );
};

export default Board;