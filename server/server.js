'use strict'

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var sticky = require('sticky-session');

// server.listen(3030);

if (!sticky.listen(server, 3030)) {
    // Master code
    server.once('listening', function () {
        console.log('server started on 3030 port');
    });
} else {
    app.get('/', function (req, res) {
        res.send('test');
    });

    io.on('connection', function (socket) {
        socket.emit('news', { hello: 'world' });
        socket.on('my other event', function (data) {
            console.log(data);
        });
    });
}


