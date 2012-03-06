var util = require('util');
var fs = require('fs');
var Tail = require("tailnative").Tail;

var LogLizer_utils = function(){}

LogLizer_utils.prototype.tn = new Tail();

LogLizer_utils.prototype.tail = function(that, logname, filename, callback){				// tail function. Using "tail -0f" command						
	return this.tn.start(filename, function(err, data) {								// and wait for output. On data, run callback
		callback(that, logname, data)													// with that and data parameter.
	});
}

LogLizer_utils.prototype.parser = function(that, logname, data, LLregexp, callback){		// parser function. Using LogLizer_regexp class
	parsed = LLregexp.exec(data.toString());
	parsed.LL_logname = logname;
	
	parsed.request = new LogLizer_regexp("({action}[^ ]+) ({uri}[^ ]+)[ ]*({protocol}[^$]*)").exec(parsed.request);
	if ( parsed.time_local )
		parsed.time_local = new Date(parsed.time_local.replace(/:/, " "));
	callback.call(that, parsed);												// to parse log line. Run callback with old this
}																				// reference and parsed line.

LogLizer_utils.prototype.check_conf = function(conf){
	
	/* checking logs */
	for ( i in conf.logs ){
		
		try { 
			fs.statSync(conf.logs[i].log_file);
		} catch(e) {
			return { error : true, type : "LOG_FILE_NOT_FOUND", index : i, file : conf.logs[i].log_file };
		}
		
	}
	
	try {
		fs.statSync(conf.globals.web.views);
	} catch(e) {
		return { error : true, type : "WEB_VIEWS_NOT_FOUND", path : conf.globals.web.views };
	}
	
	try {
		fs.statSync(conf.globals.web.public);
	} catch(e) {
		return { error : true, type : "WEB_PUBLIC_NOT_FOUND", path : conf.globals.web.public };
	}
	
	
	if ( typeof conf.globals.web.port != 'number' )
		return { error : true, type : "WEB_PORT" }
	
	
	if ( typeof conf.globals.mongodb.port != 'number' )
		return { error : true, type : "MONGODB_PORT" }
		
	
	return { error : false };
	
}

LogLizer_utils.prototype.restartLL = function(cb){
	LLdb.connect();
	LLweb.load_conf(LLconf.globals);
	LLweb.restart();
	this.restartCores();
	cb();
}

LogLizer_utils.prototype.restartCores = function(){
	for ( i in LLcores ) {
		LLcores[i].load_conf(LLconf.globals, LLconf.logs[i]);
		LLcores[i].restart();
	}
}

LogLizer_utils.prototype.stopCores = function(){
	for ( i in LLcores ) {
		LLcores[i].stop();
	}
}

LogLizer_utils.prototype.randomString = function(length) {
	chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
	string_length = length;
	randomstring = '';
	for ( i = 0; i < string_length; i++ ){
		rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}
	return randomstring;
}

exports.LogLizer_utils = LogLizer_utils;