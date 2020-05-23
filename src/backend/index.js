// const app = require('express')();
// const http = require('http').Server(app);
// const io = require('socket.io')(http);


// Client
var io2 = require('socket.io-client');
var socket2 = io2.connect('http://localhost:8321');

var msg2 = "hello";
socket2.emit('bar', msg2);
socket2.on('bar', (message) => {
    console.log(message);
})



