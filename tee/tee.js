#!/usr/bin/env node
"use strict";

var stdin    = process.stdin,
	io       = require("socket.io-client"),
	readline = require("readline");

// So we can intercept CONTROL-C in windows
if (process.platform === "win32") {
	var rl = readline.createInterface ({
		input: process.stdin,
		output: process.stdout
	});

	rl.on ("SIGINT", function (){
		process.emit ("SIGINT");
	});
}

// without this, we would only get streams once enter is pressed
//stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();
stdin.setEncoding("utf8");

// Connect to server
var socket = io.connect("http://localhost:3001");

// TODO: Instead of hard coded string, this will come from output of app server
socket.emit("client type", "command line");
socket.emit("app server instance id", "single server");

// on any data into stdin
stdin.on( "data", function( chunk ){
	// ctrl-c ( end of text )
	if ( chunk === "\u0003" ) {
		process.exit();
	}

	// write the chunk to stdout
	// process.stdout.write(chunk);


	socket.emit("app server line", { "app server line": chunk });
});

// Immediately disconnect session when user presses CONTROL-C
process.on("SIGINT", function() {
	socket.disconnect();
});
