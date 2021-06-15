import React, { useContext } from 'react';
import { ThemeContext } from './contexts/ThemeContext'

import './ThemeButton.css'

const ThemeButton = () => {
    const { darkMode, setDarkMode } = useContext(ThemeContext);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    }

    return (
        <div id="theme-button">
            <label className="switch">
                <input type="checkbox" onClick={toggleTheme}/>
                <span className="slider round"></span>
            </label>
        </div>
    );
}

export default ThemeButton;
