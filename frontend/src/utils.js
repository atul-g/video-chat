
export const connectToNewUser = (peer, userId, stream) => {
    const call = peer.call(userId, stream);
    const vidTag = document.createElement('video')
    vidTag.autoplay = true;
    call.on('stream', userVideoStream => {
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
