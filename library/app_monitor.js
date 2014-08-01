console.log("app monitor");

// Connect to server
var socket = io.connect("http://localhost:3001");

socket.emit("client type", "browser");

// Listen for unique session ID from server.
// This will be used to match up this server with browser plugin
socket.on("new session", function (data) {
	console.log("session ID: ", data.sessionId);
});

function submitError (msg, url, lineNumber) {
	console.log("submitError", msg, "at", url, ":", lineNumber);

	socket.emit("browser error", {
		message:   msg,
		url:       url,
		line:      lineNumber,
		userAgent: navigator.userAgent
	});
};

var oldOnError = window.onerror;

window.onerror = function (errorMsg, url, lineNumber) {
	submitError.call(this, errorMsg, url, lineNumber);

	if (oldOnError) {
		oldOnError(errorMsg, url, lineNumber);
	}
};