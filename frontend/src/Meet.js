import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { validate as uuidValidate } from 'uuid';
import io from 'socket.io-client'
import  Peer from 'peerjs'

const Meet = () => {
    const { meetId } = useParams(); //get the meetId passed in url as param

    if(uuidValidate(meetId) === false) {
        return InvalidMeet();
    }

    return ValidMeet(meetId);
}

const ValidMeet = (meetId) => {
    //this is called after component is rendered
    useEffect(() => {
        let myVidStream;
        const vidGrid = document.getElementById('video-grid')
        const myVidElement = document.createElement('video')
        myVidElement.autoplay = true;
        myVidElement.muted = true;

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


        const connectToNewUser = (userId, stream) => {
            const call = peer.call(userId, stream);
            const vidTag = document.createElement('video')
            vidTag.autoplay = true;
            call.on('stream', userVideoStream => {
                addVideoStream(vidTag, userVideoStream);
            })
        }

        const addVideoStream = (vidTag, stream) => {
            vidTag.srcObject = stream
            vidTag.addEventListener('loadmetadata', () => {
                vidTag.play()
            })

            vidGrid.append(vidTag)
        }

        //get camera and mic permissions
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then( stream => {
            myVidStream = stream;
            addVideoStream(myVidElement, stream)

            peer.on('call', call => {
                call.answer(stream);
                const video = document.createElement('video');
                video.autoplay = true;
                call.on('stream', userVideoStream => {
                    addVideoStream(video, userVideoStream)
                });
            })

            socket.on('user-connected', (userId) => {
                console.log(`${userId} JOINED THE ROOM!`)
                //we add the event here itself. Why? When a new user
                //connects, we send him OUR STREAM, which is represented by
                //stream below.
                connectToNewUser(userId, stream)
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
            <h2>{`${meetId}`}</h2>
            <div id="video-grid">
            </div>
        </>
    );
}

const InvalidMeet = () => {
    return (
        <>
            <h1>This meeting id is either invalid or doesn't exist.</h1>
            <Link to="/">
                <p>Go back to Home</p>
            </Link>
        </>
    )
}

export default Meet
