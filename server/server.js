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

//gets called when a connection between server and client is created
io.on('connection', function(socket){
    console.log('new user connected');
    socket.emit('newMessage', {
      from: 'admin',
      message: 'welcome',
      createdAt: new Date().getTime()
    })
    socket.broadcast.emit('newMessage', {
      from: 'admin',
      message: 'New user joined',
      createdAt: new Date().getTime()
    })
    socket.on('disconnect', () => {
      console.log("user disconnected from server");
    });


    // listens for a createMessage event from client
    socket.on('createMessage', (message) => {
      console.log('create message', message);
      io.emit('newMessage', {   //emits an event for all users
        from: message.from,
        text: message.text,
        createdAt: new Date().getTime
      })
  })



});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
