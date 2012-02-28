exports.router = function(app) {
	app.get("/settings", function(req, res) {
		res.render('settings')
	});
}