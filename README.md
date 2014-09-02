# App Monitor


chrome-extension
----------------

A Chrome extension that injects JavaScript into the top of web pages to set window.onerror to open a websocket to the server and send error info to it.

To install the extension in Chrome, go to `chrome://extensions`

* Click Developer mode
* Load unpacked extension
* Browse to the repo/chrome-extension

When Chrome encounters a JavaScript error in the page you are viewing, the extension will report it to the server.

TODO:

* Display popup to show messages from server
* Only open one websocket connection per browser, instead of every time the page loads.
* Catch errors not from JavaScript, e.g. 500 bundler errors


server
------

This runs two servers.

1. Node server that accepts websocket connections and logs objects it receives to log file.
2. Node express web server for the admin interface, allowing you to monitor active connections and view the error log.

Install MongoDB:
Go to http://docs.mongodb.org/manual/ and follow the instructions for Installation for your OS.

Make sure you've created the data folder and started the Mongo daemon:
```
mkdir /data/db
mongod
```

Install:

```
cd server
npm install
```

Generate js bundle:
```
grunt
```

(If you don't already have grunt installed, do this first):
```
npm install -g grunt-cli
```

Also, for development, you can run this to update the bundle every time you make changes:
```
grunt watch
```

Run:

```
node server.js
```




tee
---

Node script that works like unix utility tee in that it echos STDIN back to the console, but also sends it via websocket connection to server.

Install:

```
cd tee
npm install
```

Run:

```
bladerunner start | node \path\to\app-monitor\tee\tee.js
```


BRJS plugin (planned)
---------------------

* TODO: Insert a unique session ID into the js bundle, and print this same ID to the console. This will be passed through tee to the server, and used to find out which browsers are connected to which BRJS instance.
