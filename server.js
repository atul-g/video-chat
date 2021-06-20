const express = require('express');
const path = require('path');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true
})

app.use(express.static(path.join(__dirname, '/frontend/build')))
//app.use(express.static(path.join(__dirname, '/../frontend/public')))

app.use('/peerjs', peerServer);

//over here, api routes should come

//any other url is handled by react routers
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
})


io.on('connection', socket => {
    //console.log('Server: Client Connected!')

    //tells all other clients in a room with meetId, that a user with userId
    //has joined
    socket.on('join-room', (meetId, userId) => {

        socket.join(meetId);
        //this gets current number of clients in a room
        //Maybe put this above the .join() for a room limit check
        let clientNums = io.sockets.adapter.rooms.get(meetId).size
        //console.log(clientNums)
        console.log(io.sockets.adapter.rooms)

        //informs all clients of a socket room except the sending client 
        //that a new user connected
        //note: this .broadcast() is not needed here, see:
        //https://stackoverflow.com/a/66732606/11105624
        socket.to(meetId).emit('user-connected', userId)

        socket.on('message', messageObject => {
            //adding socket.to() sends message to all other sockets except
            //the sending socket. Instead, if you use io.to() here, it sends
            //messages to all sockets in the room since it's coming from the
            //server. We will want to send message to all user, including
            //the socket which sent the message because we have a socket.event
            //to add the user sent message as well to the sending user's
            //chat section
            io.to(meetId).emit('newMessage', messageObject);
        })

        socket.on('disconnect', () => {
            //console.log('Server: Client Disconnected')
            //at this point, the following message won't be sent to the
            //disconnecting socket as it is already closed.
            io.to(meetId).emit('user-left', userId);
        })

    })
})


const port = process.env.PORT || 5000;
server.listen(port, () => {
    console.log(`Server started at port ${port}`)
})
