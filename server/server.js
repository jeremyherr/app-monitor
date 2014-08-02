#!/usr/bin/env node
"use strict";

// var parser  = require("./parser");
var express    = require("express");
var routes     = require("./routes");
var http       = require("http");
var path       = require("path");
var app        = express();
var connection = require("./connection");
var mongo      = require("mongodb");
var monk       = require("monk");
var db         = monk("mongodb://127.0.0.1:27017/test");
var sessions = {};
var server;
var io;

app.set("port", process.env.PORT || 3001);
app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.use(express.static(path.join(__dirname, "public")));
app.locals.pretty = true;

// URL mappings
app.get("/",           routes.index);
app.get("/index",      routes.index);

// Make db accessible to all routers
app.set("db", db);

server = http.createServer(app).listen(app.get("port"), function() {
	console.log("Data server listening on port " + app.get("port"));
});

io = require("socket.io").listen(server, { log: false });
connection.initialize(io);

io.sockets.on("connection", connection.connect);