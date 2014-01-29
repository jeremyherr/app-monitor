console.log("running extension - start");

var embeddedCodeStart = "(" + function () {

	function submitError () {
		// TODO: submit error to node server (already exists in node-tee)
		console.log("submitError", arguments);
	};

	console.log('embedded start');

	window.onerror = function () {
		submitError.apply(this, arguments);
	};

	window.onkeydown = function () {
		console.log('ON KEY DOWN');
	};

} + ")()";

var scriptElement = document.createElement("script");
scriptElement.textContent = embeddedCodeStart;
(document.head || document.documentElement).appendChild(scriptElement);
scriptElement.parentNode.removeChild(scriptElement);