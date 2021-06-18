import { useParams } from 'react-router-dom'
import { validate as uuidValidate } from 'uuid';
import io from 'socket.io-client'
import  Peer from 'peerjs'

import InvalidMeet from './InvalidMeet'
import ValidMeet from './ValidMeet'

const Meet = () => {
    const { meetId } = useParams(); //get the meetId passed in url as param

    if(uuidValidate(meetId) === false) {
        return <InvalidMeet />;
    }

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
            <ValidMeet meetId={meetId} socket={socket} peer={peer} />
    );
}

export default Meet
