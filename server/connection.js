"use strict";

var fs = require("fs"),
	Session = require("./session"),
	sessions = require("./sessions"),
	io;

function initialize (ioInit) {
	io = ioInit;
};

function connect (socket) {
	var session = new Session(socket);

	sessions.add(session);

	function printSessionSummary () {
		console.log("number of sessions: " + sessions.getNumSessions());
		Object.keys(sessions.getAll()).forEach(function (id) {
			var session = sessions.getSession(id);
			console.log(id, session.getClientType(), session.getAddress());
		});
	}

	function onAppServerInstanceId (id) {
		session.setAppServerInstanceId(id);

		// TODO search through rest of sessions to find a matching app server instance ID
	}

	function onClientType (clientType) {
		session.setClientType(clientType);

		console.log("\nnew connection from " + session.getAddress() + ", client type " + session.getClientType());
		printSessionSummary();
	}

	function onAppServerLine (data) {
		// parser.parse(sessionId, data);
		console.log(data);
		console.log(session.getAddress());

		data.date    = new Date(Date.now());
		data.address = session.getAddress();
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
		data.address = session.getAddress();
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
		console.log("user disconnected: " + session.getAddress());
		printSessionSummary();
		sessions.remove(session.getId());
	});
};

module.exports = {
	initialize: initialize,
	connect: connect
};