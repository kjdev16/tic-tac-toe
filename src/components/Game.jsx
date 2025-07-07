import React, { useState, useCallback, useEffect } from "react";
import Board from "./Board";
import GameStats from "./GameStats.jsx";
import DarkModeToggle from "./DarkModeToggle.jsx";

const Game = () => {
    const [gameStats, setGameStats] = useState({
        xWins: 0,
        oWins: 0,
        draws: 0,
        totalGames: 0
    });

    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('darkMode');
        return saved ? JSON.parse(saved) : false;
    });

    useEffect(() => {
        localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
        document.body.classList.toggle('dark-mode', isDarkMode);
    }, [isDarkMode]);

    const updateStats = useCallback((winner) => {
        setGameStats(prev => ({
            ...prev,
            xWins: winner === 'X' ? prev.xWins + 1 : prev.xWins,
            oWins: winner === 'O' ? prev.oWins + 1 : prev.oWins,
            draws: winner === 'draw' ? prev.draws + 1 : prev.draws,
            totalGames: prev.totalGames + 1
        }));
    }, []);

    const resetStats = () => {
        setGameStats({
            xWins: 0,
            oWins: 0,
            draws: 0,
            totalGames: 0
        });
    };

    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    };

    return (
        <div className={`game-container ${isDarkMode ? 'dark' : ''}`}>
            <div className="game-header">
                <DarkModeToggle isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
            </div>
            
            <h1 className="game-title">Tic Tac Toe</h1>
            <p className="game-subtitle">Challenge your friends to a classic game!</p>
            
            <Board onGameEnd={updateStats} />
            
            {gameStats.totalGames > 0 && (
                <GameStats stats={gameStats} onReset={resetStats} />
            )}
        </div>
    );
};

export default Game;