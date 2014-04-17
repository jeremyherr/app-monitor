"use strict";

var fs = require("fs"),
	sessions = require("./sessions"),
	io;

function initialize (ioInit) {
	io = ioInit;
};

function connect (socket) {
	var address = socket.handshake.address.address;

	sessions.add(socket.id, address, socket);

	console.log("\nnew connection from " + address);
	printSessionSummary();

	function printSessionSummary () {
		console.log("number of sessions: " + sessions.getNumSessions());
		Object.keys(sessions.getAll()).forEach(function (id) {
			var session = sessions.getSession(id);
			console.log(id, session.clientType, session.address);
		});
	}

	function onAppServerInstanceId (data) {
		sessions.getSession(socket.id).appServerInstanceId = data;

		// TODO search through rest of sessions to find a matching app server instance ID
	}

	function onClientType (clientType) {
		sessions.updateClientType(socket.id, clientType);

		console.log("\nnew connection from " + address + ", client type " + clientType);
		printSessionSummary();
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
		console.log("user disconnected: " + sessions.getSession(socket.id).address);
		printSessionSummary();
		sessions.remove(socket.id);
	});
};

module.exports = {
	initialize: initialize,
	connect: connect
};