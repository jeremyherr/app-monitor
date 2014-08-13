"use strict";

var express    = require("express");
var routes     = require("./routes");
var http       = require("http");
var path       = require("path");
var app        = express();
var mongo      = require("mongodb");
var monk       = require("monk");
var db         = monk("mongodb://127.0.0.1:27017/test");

function webAdmin(sessions) {
	var server;

	app.set("port", 8080);
	app.set("views", __dirname + "/views");
	app.set("view engine", "jade");
	app.use(express.static(path.join(__dirname, "public")));
	app.locals.pretty = true;

	// URL mappings
	app.get("/",           routes.loglist);
	app.get("/loglist",    routes.loglist);

	// Make db accessible to all routers
	app.set("db", db);

	server = http.createServer(app).listen(app.get("port"), function() {
		console.log("Web server listening on port " + app.get("port"));
	});
}

module.exports = webAdmin;