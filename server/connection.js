"use strict";

var fs = require("fs"),
	MongoClient = require("mongodb").MongoClient,
	Session = require("./session"),
	io,
	sessions;

function initialize (ioInit, webSocketSessions) {
	io = ioInit;
	sessions = webSocketSessions;
}

function connect (socket) {
	// If this is an admin page connection, don't include it in the list of sessions.
	// if () {

	// }

	var session = new Session(socket);

	sessions.add(session);
	// notifyClientSessionAdded(session);

	function storeData (data, logFileName) {

		// add data to session so admin can see latest activity for this session
		session.setData(data);

		fs.appendFile(logFileName, JSON.stringify(data) + "\n", function (err) {
			if (err) throw err;
			console.log("appended to log file and database:\n", data);
		});

		MongoClient.connect("mongodb://127.0.0.1:27017/test", function(err, db) {
			if(err) throw err;

			var collection = db.collection("browser_log");
			collection.insert(data, function(err, docs) {
				db.close();
			});
		});
	}

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

		storeData(data, "server_log.txt");
	}

	function onBrowserError (data) {
		// parser.parse(sessionId, data);
		console.log(data);
		console.log(socket.handshake.address);

		data.date    = new Date(Date.now());
		data.address = session.getAddress();
		data.port    = socket.handshake.address.port;

		storeData(data, "browser_log.txt");
	}

	socket.on("app server instance id", onAppServerInstanceId);
	socket.on("client type",            onClientType);
	socket.on("app server line",        onAppServerLine);
	socket.on("browser error",          onBrowserError);

	socket.on("disconnect", function () {
		console.log("user disconnected: " + session.getAddress());
		printSessionSummary();
		sessions.remove(session.getId());
		// notifyClientSessionRemoved(session);
	});
}

module.exports = {
	initialize: initialize,
	connect: connect
};