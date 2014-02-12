#!/usr/bin/env node

var stdin    = process.stdin,
	io       = require("socket.io-client"),
	readline = require ("readline");

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
stdin.setEncoding('utf8');

// Connect to server
var socket = io.connect('http://localhost:3001');

// Listen for unique session ID from server.
// This will be used to match up this server with browser plugin
socket.on("new session", function (data) {
    console.log("session ID: ", data.sessionId);
});

// on any data into stdin
stdin.on( 'data', function( chunk ){
  // ctrl-c ( end of text )
  if ( chunk === '\u0003' ) {
    process.exit();
  }
  // write the chunk to stdout
  // process.stdout.write(chunk);

  socket.emit("chunk", { time: (new Date).getTime(), chunk: chunk });
});

// Immediately disconnect session when user presses CONTROL-C
process.on('SIGINT', function() {
	socket.disconnect();
});
