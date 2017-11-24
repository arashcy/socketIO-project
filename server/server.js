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

io.on('connection', function(socket){
  console.log('new user connected');
  socket.on('disconnect', () => {
    console.log("user disconnected from server");
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
