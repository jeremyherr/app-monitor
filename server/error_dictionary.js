(function () {
	var partialMatch = require("partial_match"),
		dictionary = {
		"gson": { suggestion: [ "You might have forgotten to deregister a service" ] },
		"Out of memory": { suggestion: [ "bladerunner out of memory, you need to restart it." ] },
		"Ignoring extra content": { suggestion: [ "what causes this and how to fix it??" ] },

		};

	function lookUp (line) {
		var knownError;

		for (knownError in dictionary) {

			if (partialMatch.matchWords(line, knownError)) {
				return dictionary[knownError];
			}

		}
	}

	if (typeof (exports) === 'object') {
		exports.lookUp = lookUp;
	}

})();
