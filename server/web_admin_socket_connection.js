"use strict";

var fs = require("fs"),
	MongoClient = require("mongodb").MongoClient,
	io,
	sessions;

function initialize (ioInit, webSocketSessions) {
	io = ioInit;
	sessions = webSocketSessions;
}

function connect (socket) {
	console.log("admin user connected: " + socket.handshake.address.address);

	socket.on("session list", function() {
		console.log(sessions.getAll());
		socket.emit("session list", Object.keys(sessions.getAll()).map(function(id) {
			return({
				clientType: sessions.getSession(id).getClientType(),
				address: sessions.getSession(id).getAddress()
			});
		}));
	});

	socket.on("disconnect", function () {
		console.log("admin user disconnected: " + socket.handshake.address.address);
	});
}

module.exports = {
	initialize: initialize,
	connect: connect
};