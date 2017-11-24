var path = require('path');
var express = require('express');
var http = require('http');
var socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();

//set up server and assign it to server variable for future configuration
var server = http.createServer(app);
//enable server and client communication
var io = socketIO(server);

//gets called a connection between server and client
io.on('connection', function(socket){
  console.log('new user connected');

  socket.on('disconnect', () => {
    console.log("user disconnected from server");
  });
  // listens for a createMessage event from client
  socket.on('createMessage', (message) => {
    console.log('create message', message);
  })

  //emits an event for client to listen for
  socket.emit('newMessage', {
    from: '@example.com',
    text: 'text'
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
