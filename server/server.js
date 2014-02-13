#!/usr/bin/env node
"use strict";

var /* parser  = require("./parser"), */
	express    = require('express'),
	http       = require('http'),
	path       = require('path'),
	app        = express(),
	connection = require('./connection'),
	sessions = {},
	server,
	io;

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

server  = http.createServer(app).listen(app.get('port'), function() {
	console.log("Data server listening on port " + app.get('port'));
});

io      = require('socket.io').listen(server, { log: false });
connection.initialize(io);

// show number of connections on command line
setInterval(function () {
	console.log("number of connections:" + Object.keys(io.sockets.sockets).length);
}, 120000);

io.sockets.on('connection', connection.connect);