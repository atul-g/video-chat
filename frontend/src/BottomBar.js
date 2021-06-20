import React, { useContext } from 'react'
import { ThemeContext } from './contexts/ThemeContext'
import { useHistory } from 'react-router-dom';

import * as utils from './utils.js'

import './BottomBar.css'

const BottomBar = ({meetId}) => {
    const { darkMode } = useContext(ThemeContext);
    let history = useHistory();


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

    const leaveMeet = () => {
        history.push("/");
    }

    return (
        <div id="bottom-bar" className={bottomBarTheme}>
            <div id="toast-success" className={toastTheme}>Meet ID copied to clipboard</div>
            <div id="toast-fail" className={toastTheme}>There was an error trying to copy meet-id to clipboard, instead, copy the URL manually.</div>
            <div className={bottomButtonTheme} onClick={copyTextToClipboard}>
                <i className="fas fa-clipboard fa-2x"></i>
            </div>
            <div className={bottomButtonTheme} onClick={utils.toggleChat}>
                <i className="fas fa-comments fa-2x"></i>
            </div>
            <div className={bottomButtonTheme} onClick={utils.toggleMute}>
                <i className="fas fa-microphone-slash fa-2x"></i>
            </div>
            <div className={bottomButtonTheme} onClick={utils.toggleVideo}>
                <i className="fas fa-video-slash fa-2x"></i>
            </div>
            <div className={bottomButtonTheme} style={{color: "red"}} onClick={leaveMeet}>
                <i className="fas fa-phone-slash fa-2x"></i>
            </div>
        </div>
    );
}

export default BottomBar;
