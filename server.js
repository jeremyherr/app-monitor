#!/usr/bin/env node

function generateUniqueSessionId () {
    return (new Date).getTime().toString();
}

var /* parser  = require("./parser"), */
    express = require('express'),
    http    = require('http'),
    fs      = require('fs'),
    path    = require('path'),
    app     = express(),
    config  = { sessions: [] };

app.configure(function(){
  app.set('port', process.env.PORT || 3001);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  // app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.locals.pretty = true;
});

app.configure('development', function () {
  app.use(express.errorHandler());
});

var server  = http.createServer(app).listen(app.get('port'), function() {
        console.log("Data server listening on port " + app.get('port'));
    }),
    io      = require('socket.io').listen(server, { log: false });

setInterval(function () {
    console.log("number of connections:" + Object.keys(io.sockets.sockets).length);
}, 120000);

io.sockets.on('connection', function (socket) {

    var sessionId = generateUniqueSessionId();

    config.sessions.push({sessionId: sessionId});

    var address = socket.handshake.address;
    console.log("new connection from " + address.address);

    socket.emit("new session", { sessionId: sessionId });

    socket.on("chunk", function (data) {
        // parser.parse(sessionId, data);
        console.log(data);
        console.log(socket.handshake.address);

        data.date    = new Date(Date.now());
        data.address = socket.handshake.address.address;
        data.port    = socket.handshake.address.port;

        fs.appendFile('log.txt', JSON.stringify(data) + "\n", function (err) {
          if (err) throw err;
          console.log("appended to log:\n", data);
        });

    });

    socket.on('disconnect', function () {
        io.sockets.emit('user disconnected');
    });
});