
export const connectToNewUser = (peer, userId, stream) => {
    const call = peer.call(userId, stream);
    console.log("Call object: ", call)
    const vidTag = document.createElement('video')
    vidTag.autoplay = true;
    console.log("Video Tag created!")
    call.on('stream', userVideoStream => {
        console.log("USERSTREAM: ", userVideoStream)
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

//export const closeStreams = () => {
//        let myVidStream = document.getElementById("my-video-tag").srcObject; 
//        myVidStream.getTracks().forEach( (track) => {track.stop();} )
//}
