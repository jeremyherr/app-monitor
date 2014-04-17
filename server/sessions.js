"use strict";

var sessions = {};

function add (id, address, socket) {
	sessions[id] = {
		address: address || "unknown_address",
		clientType: "unknown_client_type",
		appServerInstanceId: null,
		socket: socket // TODO maybe use this instead of creating my own object
	};
};

function remove (id) {
	delete sessions[id];
}

function updateClientType (id, clientType) {
	sessions[id].clientType = clientType;
}

function getSession (id) {
	return sessions[id];
}

function getAll () {
	return sessions;
}

function getNumSessions () {
	return Object.keys(sessions).length;
}

// TODO
function getAssociatedBrowserSessions (appServerInstanceId) {
	return [];
}

module.exports = {
	add: add,
	remove: remove,
	updateClientType: updateClientType,
	getSession: getSession,
	getAll: getAll,
	getNumSessions: getNumSessions,
	getAssociatedBrowserSessions: getAssociatedBrowserSessions,
};