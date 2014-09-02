"use strict";

var Session = function (socket) {
	this._socket = socket;
	this._appServerInstanceId = null;
};

Session.prototype.getId = function () {
	return this._socket.id;
};

Session.prototype.setData = function (data) {
	this._data = data;
};

Session.prototype.getData = function () {
	return this._data;
};

Session.prototype.setClientType = function (clientType) {
	this._clientType = clientType;
};

Session.prototype.getClientType = function () {
	return this._clientType || "unknown_client_type";
};

Session.prototype.getAddress = function () {
	return this._socket.handshake.address.address;
};

Session.prototype.setAppServerInstanceId = function (id) {
	this._appServerInstanceId = id;
};

Session.prototype.getAppServerInstanceId = function () {
	return this._appServerInstanceId;
};

module.exports = Session;