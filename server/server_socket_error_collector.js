"use strict";

// var parser  = require("./parser");
var http       = require("http");
var path       = require("path");
var connection = require("./connection");
var mongo      = require("mongodb");
var monk       = require("monk");
var io;

function socketServer(sessions) {
	var server;
	var port = process.env.PORT || 3001;

	server = http.createServer(requestListener).listen(port, function() {
		console.log("Data server listening on port " + port);
	});

	io = require("socket.io").listen(server, { log: false });
	connection.initialize(io, sessions);

	io.sockets.on("connection", connection.connect);
}

function requestListener() {
	// I don't think this is necessary for what I'm doing.
}

module.exports = socketServer;