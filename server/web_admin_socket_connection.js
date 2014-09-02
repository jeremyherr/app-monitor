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
			var session = sessions.getSession(id);
			var data = session.getData() || {};
			console.log("sending session: ", {
				clientType: session.getClientType(),
				address: session.getAddress(),
				url: data.url,
				message: data.message,
				userAgent: data.userAgent,
			});
			return({
				clientType: session.getClientType(),
				address: session.getAddress(),
				url: data.url,
				message: data.message,
				userAgent: data.userAgent,
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