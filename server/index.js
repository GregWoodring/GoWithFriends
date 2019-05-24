const express = require('express');
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });


server.listen(3001, () => {
    console.log('You got this!')
})