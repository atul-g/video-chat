import React, { useContext } from 'react'
import { ThemeContext } from './contexts/ThemeContext'

const ChatSection = () => {
    const { darkMode } = useContext(ThemeContext);
    console.log(`from ChatSection: ${darkMode}`)

    return (
        <div id="chat-section">
            <p>I'm Chat Section</p>
            <ul>
                <li>Hi from user 1</li>
                <li>Hi from user 1</li>
            </ul>
        </div>
    );
}

export default ChatSection;
