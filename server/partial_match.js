"use strict";

// compile the regexp once
var whiteSpace = RegExp("\\s+");

/**
 * Compares 2 lines of text, returning the number of words in common, sort of.
 * Meant to be quick. It splits up the first string into words and looks for exact copies in the second string.
 *
 * @param {String} A a line of text
 * @param {String} B a line of text
 */
function matchWords (A, B) {
	var wordsA = A.split(whiteSpace),
		wordsB = B.split(whiteSpace),
		i,
		j,
		numMatches = 0;

	for (i = wordsA.length - 1; i >= 0; i--) {
		for (j = wordsB.length - 1; j >= 0; j--) {
			if (wordsA[i] === wordsB[j]) {
				numMatches++;
				break;
			}
		}
	}

	return numMatches;
}

if (typeof (exports) === 'object') {
	exports.matchWords = matchWords;
}
