exports.index = function (req, res) {

	var db = res.app.get("db");
	var collection = db.get("browser_log");
	collection.find({}, {}, function(e, docs) {
		res.render("index", { loglist: docs });
	});

};