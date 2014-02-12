// move regexps to bladerunner-specific file
var regexps = {
        version: new RegExp("BladeRunner SDK version:\\s*([^-]+)-(\\d+)")
    },
    bladerunnerVersion,
    bladerunnerBuild;

var errorDictionary = require("error_dictionary");

// BladeRunner SDK version: 3.2.2-258182, built on: 25 April 2013 14:50 BST

var line = "";

function parse (sessionId, data) {

    line = line + data.chunk;
    process.stdout.write(line + "\n");

    if (!bladerunnerVersion) {
        var match = regexps.version.exec(line);
        if (match) {
            bladerunnerVersion = match[1];
            bladerunnerBuild   = match[2];
            console.log(sessionId + " " + "BR version: " + bladerunnerVersion);
            console.log(sessionId + " " + "BR build: "   + bladerunnerBuild);
        }
    }

    eolMatch = line.match(/([^\n]*?)\r(.*)$/m);

    console.log(line.split("\r"));

    if (eolMatch) {
        line = eolMatch[2];
    }
}

if (typeof (exports) === 'object') {
    exports.regexps = regexps;
    exports.parse   = parse;
}