console.log("running extension - end");

var embeddedCodeEnd = "(" + function () {

	function submitError () {
		console.log("submitError", arguments);
	};

	console.log('embedded end');

	var cachedOnError = window.onerror;

	window.onerror = function () {
		submitError.apply(this, arguments);

		cachedOnError.apply(this, arguments);
	};

} + ")()";

var scriptElement = document.createElement("script");
scriptElement.textContent = embeddedCodeEnd;
(document.head || document.documentElement).appendChild(scriptElement);
scriptElement.parentNode.removeChild(scriptElement);