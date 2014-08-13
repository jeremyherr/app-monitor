exports.index = function (req, res) {
	res.render("index");
};

exports.status = function (req, res) {
	res.render("status", []);
};

exports.loglist = function (req, res) {

	var db = res.app.get("db");
	var collection = db.get("browser_log");
	collection.find({ $query: {}, $orderby: { date : -1 } }, function(e, docs) {
		res.render("loglist", { loglist: docs });
	});

};