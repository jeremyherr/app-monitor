var sessions = {};

module.exports.getAll = function getAll () {
	return sessions;
};

module.exports.add = function add (id) {
	sessions[id] = {
		clientType:          "unknown",
		appServerInstanceId: null
	};
};

module.exports.getSession = function add (id) {
	return sessions[id];
};

module.exports.getAssociatedBrowserSessions = function getAssociatedBrowserSessions (appServerInstanceId) {
	return [];
};
