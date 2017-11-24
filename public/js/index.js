var socket = io(); //initiates a websocket connection request from client to the server

//listens for an event
socket.on('connect', () => {
  console.log("connected to server");

});



socket.on('disconnect', () => {
  console.log("disconnected from server");
});

socket.on('newMessage', (message) => {
  console.log('newMessage', message);
})
