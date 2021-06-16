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
        <div className={validMeetClass}>
            <ThemeButton />
            <h2>{`${meetId}`}</h2>
            <VideoSection meetId={meetId} socket={socket} peer={peer} />
            <ChatSection />
            <BottomBar />
        </div>
    );
}

export default ValidMeet
