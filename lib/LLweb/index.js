exports.router = function(app) {
	app.all("/", function(req, res) {
		res.render('index');
	});
	
	app.all("/index.json", function(req, res) {
		LLdb.find("main_logs", {}, function(data){
			res.json(data);
		});
	});
} 