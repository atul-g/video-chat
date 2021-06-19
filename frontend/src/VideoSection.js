import React, { useEffect } from 'react'
import * as utils from './utils.js'

import './VideoSection.css'

const VideoSection = ({meetId, socket, peer}) => {
    //this is called after component is rendered
    useEffect(() => {
        //this variable will be needed later while removing all streams
        let myVidStream;

        const myVidElement = document.createElement('video')
        myVidElement.setAttribute("id", "my-video-tag")
        myVidElement.classList.add('video-element')
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
                //console.log("Call received, answering call now")
                call.answer(stream);
                //console.log("We have answered the call!", stream)
                const video = document.createElement('video');
                video.autoplay = true;
                video.classList.add('video-element')
                call.on('stream', userVideoStream => {
                    utils.addVideoStream(video, userVideoStream)
                });
            })

            socket.on('user-connected', (userId) => {
                //console.log(`${userId} JOINED THE ROOM!`)
                //we add the event here itself. Why? When a new user
                //connects, we send him OUR STREAM, which is represented by
                //stream below.
                //console.log(userId, stream)
                utils.connectToNewUser(peer, userId, stream)
                //connecToNewUser calls the other guy who just joined the room
                //and creates a video tag and attaches HIS STREAM to out
                //video tag.
            })

            socket.on('user-left', (userId) => {
                let userVidElement = document.getElementsByClassName(userId)[0];
                if (userVidElement) {
                    userVidElement.remove();
                }
            })
        })

        peer.on('open', id => {
            //console.log(`${id} connected to Peer server, emitting join-room!`)
            socket.emit('join-room', meetId, id);
        })

        //TODO: POSSIBLE CLEANUP FUNCTIONS, ON-RERENDERING/STATE CHANGES
        //THERE WILL BE MULTIPLE VIDEO TAGS OF SAME PERSON.
        return () => {
            //close all active stream of the user
            myVidStream.getTracks().forEach( (track) => {track.stop();} )
            //close the client socket
            peer.disconnect();
            peer.destroy();
            socket.disconnect()
        }
    }, [])

    return (
        <>
            <div id="video-grid">
            </div>
        </>
    )
}

export default VideoSection
