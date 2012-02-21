var express = require('express');

var LogLizer_web = function(conf_globs){
	
	this.conf = conf_globs.web;
	that = this;
	
	this.app.configure(function() {
	    that.app.use(express.bodyParser());
	    that.app.use(express.logger());
	    that.app.use(express.static(that.conf.public));
	    that.app.use(express.favicon(that.conf + '/favicon.ico'));
	    that.app.use(that.app.router);
	});
	
	this.app.register('.html', require('ejs'));
	
	this.app.set('view engine', 'html');
	
	this.app.set('views', this.conf.views);
	
	this.app.set('view options', {
	    layout: "main"
	});
	
	this.app.get('/', function(req, res) {
		res.render('index', {
		    message : 'NodeLogLizer Home'
		});
	});
}

LogLizer_web.prototype.app = express.createServer();

LogLizer_web.prototype.start = function(){
	this.app.listen(this.conf.port);
}

exports.LogLizer_web = LogLizer_web;