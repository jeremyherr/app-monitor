"use strict";

var sessions = {};

function add (session) {
	sessions[session.getId()] = session;
}

function remove (id) {
	delete sessions[id];
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
	getSession: getSession,
	getAll: getAll,
	getNumSessions: getNumSessions,
	getAssociatedBrowserSessions: getAssociatedBrowserSessions,
};