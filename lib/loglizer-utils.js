var util = require('util')
var spawn = require('child_process').spawn;
var fs = require('fs');
var mongo = require('mongodb');

var Tail = require("tailnative").Tail;

var LogLizer_utils = function(){
	this.db.open(function(){});
}

LogLizer_utils.prototype.tn = new Tail();

LogLizer_utils.prototype.db = new mongo.Db('LogLizer', new mongo.Server(LLconf.globals.mongodb.host, LLconf.globals.mongodb.port, {}), {});

LogLizer_utils.prototype.insert = function(dbName, data){
	this.db.collection(dbName, function(err, collection){
		collection.insert(data, function(){});
	});
}

LogLizer_utils.prototype.tail = function(that, filename, callback){				// tail function. Using "tail -0f" command								
	this.tn.start(filename, function(err, data) {										// and wait for output. On data, run callback
		callback(that, data)													// with that and data parameter.
	});
}

LogLizer_utils.prototype.parser = function(that, data, LLregexp, callback){		// parser function. Using LogLizer_regexp class
	parsed = LLregexp.exec(data.toString());
	parsed.request = new LogLizer_regexp("({action}[^ ]+) ({uri}[^ ]+) ({protocol}[^$]+)").exec(parsed.request)
	callback.call(that, parsed);												// to parse log line. Run callback with old this
}																				// reference and parsed line.

exports.LogLizer_utils = LogLizer_utils;