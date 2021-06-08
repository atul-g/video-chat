import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { validate as uuidValidate } from 'uuid';

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
        const vidGrid = document.getElementById('video-grid')
        const myVidElement = document.createElement('video')
        myVidElement.autoplay = true;
        myVidElement.muted = true;
        
        let myVidStream;

        //get camera and mic permissions
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then( stream => {
            myVidStream = stream;
            myVidElement.srcObject = stream;
            myVidElement.addEventListener('loadmetadata', () => {
                myVidElement.play()
            })
            
            vidGrid.append(myVidElement); //add video tag to grid
        })

        //TODO: POSSIBLE CLEANUP FUNCTIONS, ON-RERENDERING/STATE CHANGES
        //THERE WILL BE MULTIPLE VIDEO TAGS OF SAME PERSON.
        return () => {
            //close all active stream of the user
            myVidStream.getTracks().forEach( (track) => {track.stop();} )
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
