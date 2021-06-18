import React, { useContext } from 'react'
import { ThemeContext } from './contexts/ThemeContext'

import './ChatSection.css';

const ChatSection = () => {
    const { darkMode } = useContext(ThemeContext);

    let chatThemeClass, backButtonTheme, usernameInputTheme;
    if(darkMode) {
        chatThemeClass = "chat-dark";
        //we are using bottom-buttons-light/dark from the same css class
        //we used for setting theme colors for bottom bar buttons
        backButtonTheme = "close-chat close-chat-dark "
        usernameInputTheme = "username-input-dark"
    } else {
        chatThemeClass = "chat-light";
        backButtonTheme = "close-chat close-chat-light"
        usernameInputTheme = "username-input-light"
    }

    const closeChat = () => {
        document.getElementById("chat-section").style.width = "0px";
    }

    return (
        <div id="chat-section" className={chatThemeClass}>
            <div className={backButtonTheme} onClick={closeChat}>
                <i className="fas fa-arrow-right fa-lg"></i>
            </div>

            <input type="text" id="username-input" className={usernameInputTheme} name="username-input" placeholder="Enter username" />

            <div className="messages-section">
                <ul>
                    <li>{`User 1:\nHehehehehehe hehehkjnsdfkjlasfde`}</li>
                    <li>Hi from user 1</li>
                </ul>
            </div>

            <input type="text" id="user-message" className={usernameInputTheme} name="user-message" placeholder="Enter message" />
        </div>
    );
}

export default ChatSection;
