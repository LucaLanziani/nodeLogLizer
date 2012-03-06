var express = require('express');
var fs = require('fs');
var io = require('socket.io');
var MemoryStore = express.session.MemoryStore;
var parseCookie = require('express/node_modules/connect').utils.parseCookie;

var LogLizer_web = function(conf_globs){
	
	this.conf = conf_globs.web;
	that = this;
	
	this.app = express.createServer();
	this.io = io.listen(this.app);
	this.sessionStore = new MemoryStore();
	
	this.io.configure(function() {
	    that.io.set('authorization', function(data, callback) {
			if (data.headers.cookie) {
				var cookie = parseCookie(data.headers.cookie);
				that.sessionStore.get(cookie['connect.sid'], function(err, session) {
					if (err || !session) {
						callback('Error', false);
					} else {
						data.session = session;
						data.sessionID = cookie['connect.sid'];
						callback(null, true);
					}
				});
			} else {
				callback('No cookie', false);
			}
		});
	});
	
	this.app.httpAllowHalfOpen = false;
	
	this.app.configure(function() {
		that.app.use(express.cookieParser());
		that.app.use(express.session({ secret: LLutils.randomString(8), store: that.sessionStore }));
	    that.app.use(express.bodyParser());	    
	    that.app.use(express.logger());
	    that.app.use(express.static(that.conf.public));
	    that.app.use(express.favicon(that.conf + '/favicon.ico'));
	    that.app.use(that.check_login);
	    that.app.use(that.app.router);
	});
	
	this.app.register('.html', require('ejs'));
	this.app.set('view engine', 'html');
	this.app.set('views', this.conf.views);
	this.app.set('view options', {
	    layout: "layout"
	});
		
	this.app.error(function(err, req, res){
  		res.render('error', {
     		message: err
  		});
	});
	
	this.app.dynamicHelpers({
		menu : function(req, res){
			first = ( req.url.split("/")[1] ) ? req.url.split("/")[1] : "";
    		return first;
  		},
  		submenu : function(req, res){
  			substream = ( req.url.split("/")[2] ) ? req.url.split("/")[2] : "";
  			return substream;
  		},
  		substream : function(req, res){
  			substream = ( req.url.split("/")[3] ) ? req.url.split("/")[3] : "";
  			return substream;
  		}
  	});
}

LogLizer_web.prototype.submenu = {};

LogLizer_web.prototype.streams_web = {};

LogLizer_web.prototype.router = function(){
	require(__dirname + "/LLweb/index").router(this.app);
	require(__dirname + "/LLweb/settings").router(this.app);
	require(__dirname + "/LLweb/streams").router(this.app);
	require(__dirname + "/LLweb/login").router(this.app);
	
	this.app.get('*', function(req, res, next){
		res.render('error', {
     		message: req.url + " : Not Found"
  		});
	});
}

LogLizer_web.prototype.check_login = function(req, res, next){
	if ( req.session.auth || req.url.match(/^\/login(|\?.*)$/) ){
		next();
		return;
	}
	
	res.redirect('/login');
}

LogLizer_web.prototype.load_conf = function(conf_globs){
	this.conf = conf_globs.web;
}

LogLizer_web.prototype.start = function(){
	this.router();
	this.conn = this.app.listen(this.conf.port);
}

LogLizer_web.prototype.stop = function(){
	this.conn.close();
}

LogLizer_web.prototype.restart = function(conf_globs){		
	this.stop();
	this.start();
}

LogLizer_web.prototype.express = express;

exports.LogLizer_web = LogLizer_web;