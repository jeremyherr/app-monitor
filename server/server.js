#!/usr/bin/env node
"use strict";

var /* parser  = require("./parser"), */
	express    = require("express"),
	routes     = require("./routes"),
	http       = require("http"),
	path       = require("path"),
	app        = express(),
	connection = require("./connection"),
	sessions = {},
	server,
	io;

app.set("port", process.env.PORT || 3001);
app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use(express.static(path.join(__dirname, "public")));
app.locals.pretty = true;

// URL mappings
app.get("/",           routes.index);
app.get("/index",      routes.index);

server = http.createServer(app).listen(app.get("port"), function() {
	console.log("Data server listening on port " + app.get("port"));
});

io = require("socket.io").listen(server, { log: false });
connection.initialize(io);

io.sockets.on("connection", connection.connect);