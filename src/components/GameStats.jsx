import React from "react";

const GameStats = ({ stats, onReset }) => {
    const { xWins, oWins, draws, totalGames } = stats;
    
    const getWinPercentage = (wins) => {
        return totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;
    };

    return (
        <div className="game-stats">
            <div className="stat-item">
                <div className="stat-number">🏆 {xWins}</div>
                <div className="stat-label">Player X Wins</div>
                <div className="stat-percentage">{getWinPercentage(xWins)}%</div>
            </div>
            
            <div className="stat-item">
                <div className="stat-number">🤝 {draws}</div>
                <div className="stat-label">Draws</div>
                <div className="stat-percentage">{getWinPercentage(draws)}%</div>
            </div>
            
            <div className="stat-item">
                <div className="stat-number">🏆 {oWins}</div>
                <div className="stat-label">Player O Wins</div>
                <div className="stat-percentage">{getWinPercentage(oWins)}%</div>
            </div>
            
            <div className="stat-item">
                <div className="stat-number">🎮 {totalGames}</div>
                <div className="stat-label">Total Games</div>
                <button 
                    className="reset-stats-btn"
                    onClick={onReset}
                    title="Reset Statistics"
                >
                    🔄
                </button>
            </div>
        </div>
    );
};

export default GameStats;