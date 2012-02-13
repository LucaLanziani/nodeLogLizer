var mongo = require("mongodb");

var LogLizer_stream = function(conf){
	this.conf = conf;
	this.db = new mongo.Db('LLLog', new mongo.Server(conf.host, conf.port, {}), {});
	this.db.open(function(){});
}

LogLizer_stream.prototype.stream = function(conf, data){
	this.db.collection(conf.name, function(err, collection){
		collection.insert(data, function(){});
	});
}

exports.LogLizer_stream = LogLizer_stream;