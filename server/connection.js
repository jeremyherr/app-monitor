var fs       = require("fs"),
	sessions = require("./sessions"),
	io;

module.exports.initialize = function initialize (io) {
	io = io;
};

module.exports.connect = function connect (socket) {
	"use strict";

	var address    = socket.handshake.address;

	// Create new entry for this session
	sessions[socket.id] = {};
	sessions[socket.id].clientType = "unknown";
	// sessions.add(socket.id);

	function onAppServerInstanceId (data) {
		sessions.getSession(socket.id).appServerInstanceId = data;

		// TODO search through rest of sessions to find a matching app server instance ID
	}

	function onClientType (data) {
		var session = sessions.getSession(socket.id);
		session.clientType = data === "command line" ? "command line" : "browser";

		console.log("new connection from " + address.address + ", client type " + session.clientType);
	}

	function onAppServerLine (data) {
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

	}

	function onBrowserError (data) {
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

	}

	socket.on("app server instance id", onAppServerInstanceId);
	socket.on("client type",            onClientType);
	socket.on("app server line",        onAppServerLine);
	socket.on("browser error",          onBrowserError);

	socket.on('disconnect', function () {
		// I probably copied this from an example
		io.sockets.emit('user disconnected');
	});
};