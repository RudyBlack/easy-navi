const express = require('express');
const app = express();
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const io = require('socket.io')(https);
const socketio = require('socket.io');

const port = 443;

const serverOption = {
  ca : fs.readFileSync('./.ssl/ca_bundle.crt'),
  key: fs.readFileSync('./.ssl/private.key'),
  cert: fs.readFileSync('./.ssl/certificate.crt'),
};


http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);


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
