# App Monitor


chrome-extension
----------------

A Chrome extension that injects JavaScript into the top of web pages to set window.onerror to open a websocket to the server and send error info to it.

TODO: Display popup to show messages from server

TODO: Only open one websocket connection per browser, instead of every time the page loads.

TODO: Catch errors not from JavaScript, e.g. 500 bundler errors



server
------

Node server that accepts websocket connections and logs objects it receives to log file.

TODO: Put these in a DB.

Install:
	cd server
	npm install

Run:
	node server.js



tee
---

Node script that works like unix utility tee in that it echos STDIN back to the console, but also sends it via websocket connection to server.

Install:
	cd tee
	npm install

Run:
	bladerunner start | node \path\to\app-monitor\tee\tee.js



BRJS plugin (planned)
---------------------

TODO: Insert a unique session ID into the js bundle, and print this same ID to the console. This will be passed through tee to the server, and used to find out which browsers are connected to which BRJS instance.
