import React from "react";

const DarkModeToggle = ({ isDarkMode, onToggle }) => {
    return (
        <button
            className="dark-mode-toggle"
            onClick={onToggle}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        >
            <div className="toggle-track">
                <div className="toggle-thumb">
                    <span className="toggle-icon">
                        {isDarkMode ? '🌙' : '☀️'}
                    </span>
                </div>
            </div>
        </button>
    );
};

export default DarkModeToggle;