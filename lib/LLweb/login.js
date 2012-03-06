exports.router = function(app) {
	
	app.all("/login", function(req, res, next){
		if ( req.session && req.session.auth )
			 res.redirect('/');
		else
			next();
	});

	app.get("/login", function(req, res) {
		res.render('login', { layout: false, error : false});
	});
	
	app.post("/login", function(req, res) {
		
		user = req.body.user;
		pass = req.body.pass;
		
		LLusers.exist(user, pass, function(user, conf, found){
			if (found){
				req.session.auth = true;
				req.session.user = user;
				req.session.admin = conf.admin;
				res.redirect('/');
			} else
				res.render('login', { layout: false, error: true}); 
		});
	});
	
	app.get("/logout", function(req, res) {
		console.log(LLweb.io);
		for ( i in LLweb.io.handshaken ){
			if ( LLweb.io.handshaken[i].sessionID == req.sessionID )
				LLweb.io.sockets.sockets[i].disconnect();
		}
		
		
		req.session.destroy();
		res.redirect('/login');
	});
} 