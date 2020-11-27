const express = require('express');
const app = express();
const http = require('http').Server(app);
const https = require('https');
const fs = require('fs');
const path = require('path');
const io = require('socket.io')(http);
const socketio = require('socket.io');

const port = 443;

const serverOption = {
  ca : fs.readFileSync('./.ssl/ca_bundle.crt'),
  key: fs.readFileSync('./.ssl/private.key'),
  cert: fs.readFileSync('./.ssl/certificate.crt'),
};

require('./socket/socket.js');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend', 'index.html'));
});

app.route('/src/*').all(function (req, res) {
    res.sendFile(path.join(__dirname, './frontend', req.url));
});

https.createServer(serverOption, app).listen(port, () => {
  console.log('HTTPS Server Started');
});


io.on('connection', function (socket) {
    console.log('user connected: ', socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected: ', socket.id);
    });

    socket.on('userLocation', function (e) {
        console.log(e);
        let {id, data} = e;
        socket.broadcast.emit('userLocation', {id , data});
    });
    
});

module.exports = app;
