import React, { useContext } from 'react'

import VideoSection from './VideoSection'
import ChatSection from './ChatSection'
import BottomBar from './BottomBar'
import ThemeButton from './ThemeButton'

import { ThemeContext } from './contexts/ThemeContext'

import './ValidMeet.css'

const ValidMeet = ({meetId, socket, peer}) => {
    const { darkMode } = useContext(ThemeContext);

    let validMeetClass;
    if(darkMode) {
        validMeetClass = "valid-meet-section valid-meet-dark";
    } else {
        validMeetClass = "valid-meet-section valid-meet-light";
    }

    return (
        // this div is only for setting light/dark theme
        <div className={validMeetClass}>
            <div className="themebutton-flex">
                <ThemeButton />
            </div>
            {/* we allot flex column for video-grid and bottom-bar */}
            <div className="valid-meet-flex-column">
                <VideoSection meetId={meetId} socket={socket} peer={peer} />
                <BottomBar meetId={meetId} />
            </div>
            <ChatSection socket={socket}/>
        </div>
    );
}

export default ValidMeet
