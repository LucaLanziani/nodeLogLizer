exports.router = function(app) {
	app.get("/settings", function(req, res) {
		res.render('settings',{
			conf: LLconf
		});
	});
	
	app.get("/settings.json", function(req, res) {
		res.send(JSON.stringify(LLconf, true));
	});
	
	app.post("/settings.json", function(req, res) {
		console.log(req.body);
		res.send(JSON.stringify(req.body));
	});
}