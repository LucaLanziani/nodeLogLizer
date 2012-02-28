exports.router = function(app) {
	app.all("/streams", function(req, res) {
		res.render('streams')
	});
	
	app.all('/streams/:stream', function(req, res){
		res.render(__dirname + "/../../streams/" + req.params.stream + "/web/views/index");
	});
	
	app.all(/\/streams\/([^\/]+)\/(.*)/, function(req, res, next){
		path = __dirname + "/../streams/" + req.params[0] + "/web/public/" + req.params[1];
		fs.realpath(path, function(err, resolvedPath){
			if (err)
				next();
			else
				res.sendfile(resolvedPath, function(err){
					if (err)
						next();
		  		});
		});
	});
}