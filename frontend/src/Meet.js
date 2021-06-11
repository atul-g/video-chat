import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { validate as uuidValidate } from 'uuid';
import io from 'socket.io-client'
import  Peer from 'peerjs'
import * as utils from './utils.js'

import InvalidMeet from './InvalidMeet'

const Meet = () => {
    const { meetId } = useParams(); //get the meetId passed in url as param

    if(uuidValidate(meetId) === false) {
        return InvalidMeet();
    }

    return ValidMeet(meetId);
}

//const ValidMeet = (meetId) => {
//
//    useEffect(() => {
//        //leaving the arguemnt of io as blank, this will make it connect to the
//        //"/" by default
//        let socket = io()
//
//        //passing undefined for id, because Peer will automatically create one
//        let peer = new Peer(undefined, {
//            path: '/peerjs',    //we got this from server.js
//            host: '/',  //whatever host this is being hosted on - heroku/local etc
//            port: '5000'    //nodejs server is on 5000
//        })
//
//        peer.on('open', id => {
//            console.log(id)
//            socket.emit('join-room', meetId, id);
//        })
//        let myVidStream;
//        const myVidElement = document.createElement('video')
//        myVidElement.autoplay = true;
//        myVidElement.muted = true;
//
//        //get camera and mic permissions
//        navigator.mediaDevices.getUserMedia({
//            video: true,
//            audio: true
//        }).then( stream => {
//            myVidStream = stream;
//            utils.addVideoStream(myVidElement, stream)
//
//            peer.on('call', call => {
//                call.answer(stream);
//                const video = document.createElement('video');
//                video.autoplay = true;
//                call.on('stream', userVideoStream => {
//                    utils.addVideoStream(video, userVideoStream)
//                });
//            })
//
//            socket.on('user-connected', (userId) => {
//                console.log(`${userId} JOINED THE ROOM!`)
//                //we add the event here itself. Why? When a new user
//                //connects, we send him OUR STREAM, which is represented by
//                //stream below.
//                utils.connectToNewUser(peer, userId, stream)
//                //connecrToNewUser calls the other guy who just joined the room
//                //and creates a video tag and attaches HIS STREAM to out
//                //video tag.
//            })
//        })
//
//        //TODO: POSSIBLE CLEANUP FUNCTIONS, ON-RERENDERING/STATE CHANGES
//        //THERE WILL BE MULTIPLE VIDEO TAGS OF SAME PERSON.
//        return () => {
//            //close all active stream of the user
//            myVidStream.getTracks().forEach( (track) => {track.stop();} )
//            //close the client socket
//            socket.disconnect()
//        }
//
//    }, [])
//
//    return (
//        <>
//            <h2>{`${meetId}`}</h2>
//            <h1>Meeting in progress!</h1>
//            <div id="video-grid">
//            </div>
//        </>
//    );
//}

const ValidMeet = (meetId) => {

    //leaving the arguemnt of io as blank, this will make it connect to the
    //"/" by default
    let socket = io()

    //passing undefined for id, because Peer will automatically create one
    let peer = new Peer(undefined, {
        path: '/peerjs',    //we got this from server.js
        host: '/',  //whatever host this is being hosted on - heroku/local etc
        port: '5000'    //nodejs server is on 5000
    })

    peer.on('open', id => {
        console.log(id)
        socket.emit('join-room', meetId, id);
    })

    return (
        <>
            <h2>{`${meetId}`}</h2>
            <VideoSection socket={socket} peer={peer} />
        </>
    );
}

const VideoSection = ({socket, peer}) => {
    //this is called after component is rendered
    useEffect(() => {
        let myVidStream;
        const myVidElement = document.createElement('video')
        myVidElement.autoplay = true;
        myVidElement.muted = true;

        //get camera and mic permissions
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then( stream => {
            myVidStream = stream;
            utils.addVideoStream(myVidElement, stream)

            peer.on('call', call => {
                call.answer(stream);
                const video = document.createElement('video');
                video.autoplay = true;
                call.on('stream', userVideoStream => {
                    utils.addVideoStream(video, userVideoStream)
                });
            })

            socket.on('user-connected', (userId) => {
                console.log(`${userId} JOINED THE ROOM!`)
                //we add the event here itself. Why? When a new user
                //connects, we send him OUR STREAM, which is represented by
                //stream below.
                utils.connectToNewUser(peer, userId, stream)
                //connecrToNewUser calls the other guy who just joined the room
                //and creates a video tag and attaches HIS STREAM to out
                //video tag.
            })
        })

        //TODO: POSSIBLE CLEANUP FUNCTIONS, ON-RERENDERING/STATE CHANGES
        //THERE WILL BE MULTIPLE VIDEO TAGS OF SAME PERSON.
        return () => {
            //close all active stream of the user
            myVidStream.getTracks().forEach( (track) => {track.stop();} )
            //close the client socket
            socket.disconnect()
        }
    }, [])

    return (
        <>
            <h1>Meeting in progress!</h1>
            <div id="video-grid">
            </div>
        </>
    )
}

export default Meet
