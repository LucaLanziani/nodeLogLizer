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
	    layout: "layout"
	});
	
	this.app.get(/\/(|home)$/, function(req, res) {
		res.render('index');
	});
	
	this.app.get('/streams/:stream', function(req, res) {
		res.render(__dirname + "/../streams/" + req.params.stream + "/views/" + req.params.stream);			
	});
		
	this.app.error(function(err, req, res){
  		res.render('error', {
     		message: err
  		});
	});
	
	this.app.dynamicHelpers({
		stream : function(req, res){
			stream = ( req.url.split("/")[2] ) ? req.url.split("/")[2] : "";
    		return stream;
  		},
  		substream : function(req, res){
  			substream = ( req.url.split("/")[3] ) ? req.url.split("/")[3] : "";
  			return substream;
  		}
  	});
}

LogLizer_web.prototype.submenu = {};

LogLizer_web.prototype.streams_web = {};

LogLizer_web.prototype.app = express.createServer();

LogLizer_web.prototype.start = function(){
	this.app.listen(this.conf.port);
}

exports.LogLizer_web = LogLizer_web;