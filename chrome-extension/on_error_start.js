console.log("running extension - start");

// Connect to server
var socket = io.connect('http://localhost:3001');

socket.emit("client type", "browser");

// Listen for unique session ID from server.
// This will be used to match up this server with browser plugin
socket.on("new session", function (data) {
	console.log("session ID: ", data.sessionId);
});

// TODO: possibly use this when I get background/event page working, possibly that's better.
function sendError (msg, url, lineNumber) {
	// instead of doing the websocket connection inside the webpage, it should send a message to the extension, and the extension should send the message
	// socket.emit("chunk", { time: (new Date).getTime(), chunk: msg + " at " + url + " : " + lineNumber });

	chrome.runtime.sendMessage("icdabehbkpkdnlkcillbpmjpegfehbgl", "message from content script to extension", {}, function () {
		console.log("callback");
	});

}

function receiveMessage(event)
{
	// We only accept messages from ourselves
	if (event.source != window) {
		return;
	}
	socket.emit("browser error", event.data);
}

window.addEventListener("message", receiveMessage, false);

var embeddedCodeStart = "(" + function () {

	function submitError (msg, url, lineNumber) {
		console.log("submitError", msg, "at", url, ":", lineNumber);

		window.postMessage({ message: msg, url: url, line: lineNumber, userAgent: navigator.userAgent }, "*");
	};

	console.log('embedded start');

	var oldOnError = window.onerror;

	window.onerror = function (errorMsg, url, lineNumber) {
		submitError.call(this, errorMsg, url, lineNumber);

		if (oldOnError) {
			oldOnError(errorMsg, url, lineNumber);
		}
	};

} + ")()";

var scriptElement = document.createElement("script");
scriptElement.textContent = embeddedCodeStart;
(document.head || document.documentElement).appendChild(scriptElement);
scriptElement.parentNode.removeChild(scriptElement);