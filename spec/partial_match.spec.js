var partialMatch = require("../partial_match");

describe("partialMatch function", function () {
	it("returns 8 when sentences with 8 words are identical", function () {
		var sentence = "Here is my first sentence, with some punctuation.";
		expect(partialMatch.matchWords(sentence, sentence)).toBe(1);
	});

	it("returns 0 when sentences are share no words", function () {
		var sentence1 = "not a single word matches",
			sentence2 = "test this and only this";

		expect(partialMatch.matchWords(sentence1, sentence2)).toBe(0);
	});

	it("returns a number between 0 and 1 when some words match", function () {
		var sentence1 = "and only certain words match",
			sentence2 = "only certain things match and words must be in correct order";

		// not sure what I want here. Maybe start by just counting number of matching words, regardless of order
		expect(partialMatch.matchWords(sentence1, sentence2)).toBe(2);
	});
});