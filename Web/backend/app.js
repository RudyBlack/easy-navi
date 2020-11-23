const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);
const socketio = require('socket.io');

const port = 3000;

require('./socket/socket.js');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

app.route('/src/*').all(function (req, res) {
    res.sendFile(path.join(__dirname, '../frontend', req.url));
});

http.listen(3000, function () {
    console.log('app is running on port: 3000');
});

io.on('connection', function (socket) {
    console.log('user connected: ', socket.id);

    io.to(socket.id).emit('hello', 'is Connect!');

    socket.on('disconnect', () => {
        console.log('user disconnected: ', socket.id);
    });

    socket.on('userLocation', function (e) {
        io.to(id).emit('userLocation', data); // 이게 안됨.

    });
    

});



module.exports = app;