import React, { useContext } from 'react'
import { ThemeContext } from './contexts/ThemeContext'

import './BottomBar.css'

const BottomBar = ({meetId}) => {
    const { darkMode } = useContext(ThemeContext);

    let bottomBarTheme, bottomButtonTheme, toastTheme;
    if(darkMode) {
        bottomBarTheme = "bottom-bar-dark"
        bottomButtonTheme = "bottom-buttons bottom-buttons-dark";
        toastTheme = "toast toast-dark"
    } else {
        bottomBarTheme = "bottom-bar-light"
        bottomButtonTheme = "bottom-buttons bottom-buttons-light";
        toastTheme = "toast toast-light"
    }

    const toggleChat = () => {
        const chatSection = document.getElementById("chat-section")

        if(chatSection.style.width === "0px" || chatSection.style.width === "") {
            chatSection.style.width = "300px"
        } else {
            chatSection.style.width = "0px"
        }
    }

    const copyTextToClipboard = () => {
        navigator.clipboard.writeText(meetId).then(() => {
            let toast = document.getElementById("toast-success");
            toast.classList.add("show")
            setTimeout( () => {
                toast.classList.remove("show")
            }, 3000)

        }, (err) => {
            let toast = document.getElementById("toast-fail");
            toast.classList.add("show")
            setTimeout( () => {
                toast.classList.remove("show")
            }, 3000)
        });
    }

    return (
        <div id="bottom-bar" className={bottomBarTheme}>
            <div id="toast-success" className={toastTheme}>Meet ID has been copied to clipboard!</div>
            <div id="toast-fail" className={toastTheme}>There was an error trying to copy meet-id to clipboard, instead, copy the URL manually.</div>
            <div className={bottomButtonTheme} onClick={copyTextToClipboard}>
                <i className="fas fa-clipboard fa-2x"></i>
            </div>
            <div className={bottomButtonTheme} onClick={toggleChat}>
                <i className="fas fa-comments fa-2x"></i>
            </div>
            <div className={bottomButtonTheme} onClick={toggleChat}>
                <i className="fas fa-volume-up fa-2x"></i>
            </div>
            <div className={bottomButtonTheme} onClick={toggleChat}>
                <i className="fas fa-video fa-2x"></i>
            </div>
            <div className={bottomButtonTheme} onClick={toggleChat}>
                <i className="fas fa-phone-slash fa-2x"></i>
            </div>
        </div>
    );
}

export default BottomBar;
