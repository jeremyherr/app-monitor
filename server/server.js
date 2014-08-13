#!/usr/bin/env node
"use strict";

// var parser  = require("./parser");
var http         = require("http");
var path         = require("path");
var mongo        = require("mongodb");
var monk         = require("monk");
var socketServer = require("./server_socket_error_collector.js");
var webAdmin     = require("./server_web_admin");
var sessions     = require("./sessions");

// start the error collector
socketServer(sessions);

// start the web admin interface
webAdmin(sessions);