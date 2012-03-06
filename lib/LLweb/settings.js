exports.router = function(app) {
	app.get("/settings", function(req, res) {
		res.render('settings',{
			conf: LLconf
		});
	});
	
	app.get("/settings/users", function(req, res) {
		res.render('settings-users',{
			conf: LLconf
		});
	});
	
	app.get("/settings.json", function(req, res) {
		res.send(JSON.stringify(LLconf, true));
	});
	
	app.post("/settings.json", function(req, res) {
		tmp_conf = JSON.parse(req.body.conf);
		ret = LLutils.check_conf(tmp_conf);
		
		if ( ! ret.error ){
			LLconf = tmp_conf;
			LLconf.save(LLconf_path);
			LLutils.restartCores();
		}
		
		res.send(JSON.stringify(ret));
	});
	
	app.get("/reboot.json", function(req, res) {
		LLutils.restartLL(function(){
			res.json({ port : LLconf.globals.web.port });
		});
	})
}