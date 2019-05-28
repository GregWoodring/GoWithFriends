const express = require('express');
const secret = require('./secret');
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
//this will prevent socket.io from using ajax, so that
//it can be freely used as a redundancy.
io.set('transports', ['websocket']);
let sharedsession = require('express-socket.io-session');

io.use(sharedsession(session, {
    autoSave: true
}))

let rooms = {};
let users = {};

app.use(sharedsession(session));

app.get('/lobby', (req, res) => {
    res.send(rooms);
})

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
    let {cookie} = socket.handshake.headers;
    //I'm using a hash to help with efficiency
    if(!users[cookie]){
        users[cookie] = {
            cookie,
            //will later add functionality for people to add temp
            //names, may create a random name generator as well
            userName: 'anon',
            location: 'lobby'
        }
    }
    //This event tells us that lobby events have been initialized
    //and it's safe to send the client information
    socket.on('initiializedLobbyEvents', () => {
        socket.emit('updateGames', rooms);
        lobby.emit('updateUsers', users);
    })

    //On disconnect remove the user from the users hash and update 
    //users on connected client
    socket.on('disconnect', () => {
        let {cookie} = socket.handshake.headers
        delete users[cookie];
        lobby.emit('updateUsers', users);
    })
    
});



const gameNsp = io.of('/game');
gameNsp.use(sharedsession(session))
gameNsp.on('connection', socket => {
    socket.emit('connectedToGame');
    socket.on('joinRoom', function (data) {
        socket.join(data.room);

        let {cookie} = socket.handshake.headers;

        socket.handshake.session.roomId = data.room;
        let user = users[cookie]
        if(rooms[data.room]){
            console.log(data, 'Game Does Exists')
            rooms[data.room].users.push(user);
        } else {
            console.log(data, 'Game Does not Exists')
            
            rooms[data.room] = {
                roomId: data.room,
                gameName: data.gameName,
                gameTime: data.gameTime,
                users: [user]
            }
        }
        lobby.emit('updateGames', rooms)
        console.log(rooms)
        

        

        
        // socket.handshake.session.gameName = data.gameName;
        // socket.handshake.session.gameTime = data.gameTime;

        
        // socket.emit('maintainState', data.state)
    });
    socket.on('play', function(data) {
        socket.handshake.session.state = data;
        socket.to('testRoom').emit('maintainState', data)
    })
    socket.on('disconnect', () => {
        let {cookie} = socket.handshake.headers;

        if(rooms[socket.handshake.session.roomId] && rooms[socket.handshake.session.roomId].users.length > 0){
            delete rooms[socket.handshake.session.roomId];
        } else if(rooms[socket.handshake.session.roomId]){
            console.log('before', rooms);
            let index = rooms[socket.handshake.session.roomId].users.findIndex(item => {
                item.cookie === cookie
            })
            rooms[socket.handshake.session.roomId].users.splice(index, 1);
            console.log('after', rooms);
        } else{
            console.log('this happened')
        }
        console.log(rooms)
        lobby.emit('updateGames', rooms);
    })

    socket.emit('recievedGameConnection', { hello: 'world' });
    
});

setInterval(() => lobby.emit('updateGames', rooms), 1000);

server.listen(3001, () => {
    console.log('You got this!')
})