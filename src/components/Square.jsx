import React from "react";

const Square = ({ onClick, value, isWinning }) => {
    const getSquareClass = () => {
        let className = "square";
        
        if (value) {
            className += " filled";
            className += value === 'X' ? " x" : " o";
        }
        
        if (isWinning) {
            className += " winning";
        }
        
        return className;
    };

    const getDisplayValue = () => {
        if (value === 'X') return '❌';
        if (value === 'O') return '⭕';
        return '';
    };

    return (
        <button
            className={getSquareClass()}
            onClick={onClick}
            disabled={!!value}
            aria-label={value ? `Square filled with ${value}` : 'Empty square'}
        >
            {getDisplayValue()}
        </button>
    );
};

export default Square;