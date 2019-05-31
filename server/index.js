const express = require('express');
const path = require('path'); 
// const secret = require('./secret');
const secret = {
    sessionSecret: '6K+p!sHK$yul:tS"E%-)!o}.QZJH@L'
}
let session = require('express-session')({
    secret: secret.sessionSecret,
    resave: true,
    saveUninitialized: true
});
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server, {
    cookie: true
});
let port = process.env.PORT || 3001;

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build', 'index.html'))
// })
//this will prevent socket.io from using ajax, so that
//it can be freely used as a redundancy.
io.set('transports', ['websocket']);
let sharedsession = require('express-socket.io-session');

io.use(sharedsession(session, {
    autoSave: true
}))

let lobbyData = require('./controllers/lobbyController');

app.use(sharedsession(session));


//should move this later to a new 
//module, got it from: https://stackoverflow.com/questions/6563885/socket-io-how-do-i-get-a-list-of-connected-sockets-clients
//deleted it, leaving link in case I need it later
//find users' socket


//create lobby namespace, not sure if this is really
//needed but I was running into issues not doing this
const lobby = io.of('/');
//I believe this is causing trouble but without it I can't access
//session at all
lobby.use(sharedsession(session));
//When the lobby recieves a new connection it will be passed the client's
//socket, which we can add event handlers on
lobby.on('connection', function (socket) {
    //First we emit back to the client to tell it that we recieved it's
    //connection, this allows it to initialize it's events
    socket.emit('connectedToLobby');
    //Create a new users, since session isn't working well I will
    //store this in memory and will have to handle clean-up manually
    
    //I'm using a hash to help with efficiency

    socket.on('getUpdates', () => {
        socket.emit('updateLobbyData', lobbyData.Data)
    });
    //This event tells us that lobby events have been initialized
    //and it's safe to send the client information
    socket.on('initiializedLobbyEvents', () => {
        socket.emit('updateLobbyData', lobbyData.Data)
    });

    socket.on('updateUser', data => {
        let {cookie} = socket.handshake.headers;
        lobbyData.updateUsers(cookie, data);
    })

    socket.on('updateMessages', data => {
        let {messageId} = data;
        lobbyData.updateMessages(messageId, data) 
    })

    socket.on('createGame', data => {
        let {cookie} = socket.handshake.headers;
        lobbyData.createRoom(data.roomId, data.gameName, data.gameTime, data.role, cookie);
        let intervalID = setInterval(() => {
            if(lobbyData.rooms[data.roomId]){
                gameNsp.to(data.roomId).emit('checkRoomUpdates', lobbyData.rooms[data.roomId].timestamp)
            }
        }, 500);
            
        lobbyData.rooms[data.roomId].intervalID = intervalID;
    })

    socket.on('joinGame', data => {
        let {cookie} = socket.handshake.headers;
        let user = lobbyData.users[cookie];
        user.role = data.role;
        lobbyData.rooms[data.roomId].updateUsers(cookie, user);
    })



    //On disconnect remove the user from the users hash and update 
    //users on connected client
    socket.on('disconnect', () => {
        let {cookie} = socket.handshake.headers
        lobbyData.updateUsers(cookie, {}, true)
    })
    
});

//Check for updates on interval, send timestamp
//client will check it's timestamp in state, if timestamp
//is different emit update event and send lobby state
setInterval(() => lobby.emit('checkChanges', lobbyData.timestamp), 1000);






const gameNsp = io.of('/game');
gameNsp.use(sharedsession(session))
gameNsp.on('connection', socket => {
    // console.log(socket)
    gameNsp.to(socket.id).emit('connectedToGame');
    socket.on('joinRoom', roomId => {
        if(lobbyData.rooms[roomId]){
            socket.join(roomId);
            gameNsp.to(roomId).emit('updateRoomInfo', lobbyData.rooms[roomId].returnData())
        }
        console.log('out of if');
    });

    socket.on('getRoomUpdates', roomId => {
        gameNsp.to(socket.id).emit('updateRoomInfo', lobbyData.rooms[roomId].returnData());
    })

    function userDisconnected(){
        let {cookie} = socket.handshake.headers
            for(let room in lobbyData.rooms){
                if(lobbyData.rooms[room].users[cookie]){
                    console.log('user disconnected')
                    lobbyData.rooms[room].updateUsers(cookie, {}, true);
                }
                if(Object.keys(lobbyData.rooms[room].users).length <= 0){
                    console.log('clearing room')
                    delete lobbyData.rooms[room]
                }
            }
    }
    socket.on('disconnect', userDisconnected);

    socket.on('leaving', userDisconnected);
    
    socket.on('handlePlay', data => {
        console.log('got play')
        let {cookie} = socket.handshake.headers;
        if(lobbyData.rooms[data.roomId]){
            lobbyData.rooms[data.roomId].handlePlay(data.posX, data.posY, cookie);
        }
    })

    socket.on('handlePass', data => {
        let {cookie} = socket.handshake.headers;
        if(lobbyData.rooms[data.roomId]){
            lobbyData.rooms[data.roomId].handlePass(cookie);
        }
    })
    
});


server.listen(port, () => {
    console.log('You got this!')
})