import React, { useContext } from 'react'
import { ThemeContext } from './contexts/ThemeContext'

const BottomBar = () => {
    const { darkMode } = useContext(ThemeContext);
    console.log(`from BottomBar: ${darkMode}`)

    return (
        <div id="bottom-bar">
            <p>I'm bottom bar</p>
        </div>
    );
}

export default BottomBar;
