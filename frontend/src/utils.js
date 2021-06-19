
export const connectToNewUser = (peer, userId, stream) => {
    const call = peer.call(userId, stream);
    const vidTag = document.createElement('video')
    vidTag.autoplay = true;
    vidTag.classList.add('video-element', userId)
    //console.log("Video Tag created!")
    call.on('stream', userVideoStream => {
        //console.log("USERSTREAM: ", userVideoStream)
        addVideoStream(vidTag, userVideoStream);
    })
}

export const addVideoStream = (vidTag, stream) => {
    const vidGrid = document.getElementById('video-grid')
    vidTag.srcObject = stream
    vidTag.addEventListener('loadmetadata', () => {
        vidTag.play()
    })

    vidGrid.append(vidTag)
}


//open or close chat
export const toggleChat = () => {
    const chatSection = document.getElementById("chat-section")

    if(chatSection.style.width === "0px" || chatSection.style.width === "") {
        chatSection.style.width = "300px"
    } else {
        chatSection.style.width = "0px"
    }
}

//mute or unmute
export const toggleMute = () => {
    let stream = document.getElementById("my-video-tag").srcObject;
    if(stream.getAudioTracks()[0].enabled) {
        stream.getAudioTracks()[0].enabled = false; //disable the audio part
        setMicButton();
    } else {
        stream.getAudioTracks()[0].enabled = true;
        setMuteButton();
    }
}

function setMuteButton() {
    let element = document.getElementsByClassName("fa-microphone")[0];
    element.className = "fas fa-microphone-slash fa-2x";
}

function setMicButton() {
    let element = document.getElementsByClassName("fa-microphone-slash")[0];
    element.className = "fas fa-microphone fa-2x";
}

//for closing or opening camera
export const toggleVideo = () => {
    let stream = document.getElementById("my-video-tag").srcObject;
    if(stream.getVideoTracks()[0].enabled) {
        stream.getVideoTracks()[0].enabled = false; //disable the audio part
        setVideoButton();
    } else {
        stream.getVideoTracks()[0].enabled = true;
        setVideoCloseButton();
    }
}

function setVideoCloseButton() {
    let element = document.getElementsByClassName("fa-video")[0];
    element.className = "fas fa-video-slash fa-2x";
}

function setVideoButton() {
    let element = document.getElementsByClassName("fa-video-slash")[0];
    element.className = "fas fa-video fa-2x";
}

//export const closeStreams = () => {
//        let myVidStream = document.getElementById("my-video-tag").srcObject; 
//        myVidStream.getTracks().forEach( (track) => {track.stop();} )
//}
