var fs       = require('fs'),
	sessions = {},
	io;

function initialize (io) {
	io = io;
}

function connect (socket) {
	"use strict";

	var clientType = "unknown",
		address    = socket.handshake.address;

	// Create new entry for this session
	sessions[socket.id] = {};

	// Get and store app server instance ID
	socket.on("app server instance id", function (data) {
		sessions[socket.id].appServerInstanceId = data;

		// TODO search through rest of sessions to find a matching app server instance ID
	});

	// Get and store client type
	socket.on("client type", function (data) {
		clientType = data === "command line" ? "command line" : "browser";
		sessions[socket.id].clientType = clientType;

		console.log("new connection from " + address.address + ", client type " + clientType);
	});

	socket.on("app server line", function (data) {
		// parser.parse(sessionId, data);
		console.log(data);
		console.log(socket.handshake.address);

		data.date    = new Date(Date.now());
		data.address = socket.handshake.address.address;
		data.port    = socket.handshake.address.port;

		fs.appendFile('server_log.txt', JSON.stringify(data) + "\n", function (err) {
			if (err) throw err;
			console.log("appended to log:\n", data);
		});

	});

	socket.on("browser error", function (data) {
		// parser.parse(sessionId, data);
		console.log(data);
		console.log(socket.handshake.address);

		data.date    = new Date(Date.now());
		data.address = socket.handshake.address.address;
		data.port    = socket.handshake.address.port;

		fs.appendFile('browser_log.txt', JSON.stringify(data) + "\n", function (err) {
			if (err) throw err;
			console.log("appended to log:\n", data);
		});

	});

	socket.on('disconnect', function () {
		// I probably copied this from an example
		io.sockets.emit('user disconnected');
	});
}

module.exports.initialize = initialize;
module.exports.connect    = connect;