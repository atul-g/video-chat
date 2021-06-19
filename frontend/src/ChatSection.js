import React, { useContext, useEffect } from 'react'
import { ThemeContext } from './contexts/ThemeContext'
import Hammer from 'hammerjs';

import './ChatSection.css';

const ChatSection = ({socket}) => {

    useEffect(() => {
        //for adding swipe left to close chat in phone screens
        let chatSectionElement = document.getElementById("chat-section")
        let hammertime = new Hammer(chatSectionElement);

        hammertime.get('swipe').set({direction: Hammer.DIRECTION_RIGHT})
        hammertime.on('swipe', (ev) => {
            closeChat();
        })

        socket.on("newMessage", ({user, message}) => {
            let msgList = document.getElementsByClassName("message-list")[0];
            msgList.innerHTML += `<div class="single-message"><li><b>${user}</b></li>\n<li>${message}</li></div>`

            //scroll automatically to the end on new messages arrival
            chatSectionElement.scrollTo(0, chatSectionElement.scrollHeight)
        })

        //cleanup event listeners and other stuff
        return () => {
            hammertime.destroy();
            window.removeEventListener('keydown', inputMsgOnChange);
        }
    }, [])

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

    const inputMsgOnChange = (e) => {
        let msg = document.getElementById("user-message");
        let message = msg.value;
        if (e.which === 13 && message.length !== 0) {
            let user = document.getElementById("username-input").value;
            if (user.length === 0) {
                user = "Anonymous"
            } 

            socket.emit('message', {user, message});
            msg.value = "";
        }
    }

    return (
        <div id="chat-section" className={chatThemeClass}>
            <div className={backButtonTheme} onClick={closeChat}>
                <i className="fas fa-arrow-right fa-lg"></i>
            </div>

            <input type="text" id="username-input" className={usernameInputTheme} name="username-input" placeholder="Enter username to show" />

            <div className="messages-section">
                <ul className="message-list">
                </ul>
            </div>

            <input type="text" id="user-message" className={usernameInputTheme} name="user-message" placeholder="Enter message" onKeyDown={(e) => inputMsgOnChange(e)} />
        </div>
    );
}

export default ChatSection;
