import React from 'react'
import io from 'socket.io-client'
import  Peer from 'peerjs'

import VideoSection from './VideoSection'
import ChatSection from './ChatSection'
import BottomBar from './BottomBar'

const ValidMeet = (meetId) => {

    //leaving the arguemnt of io as blank, this will make it connect to the
    //"/" by default
    let socket = io()

    //passing undefined for id, because Peer will automatically create one
    let peer = new Peer(undefined, {
        path: '/peerjs',    //we got this from server.js
        host: '/',  //whatever host this is being hosted on - heroku/local etc
        port: '5000'    //nodejs server is on 5000, change to 443 in heroku
    })

    return (
        <>
            <h2>{`${meetId}`}</h2>
            <VideoSection meetId={meetId} socket={socket} peer={peer} />
            <ChatSection />
            <BottomBar />
        </>
    );
}

export default ValidMeet