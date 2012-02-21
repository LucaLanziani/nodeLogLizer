var LogLizer_stream = function(conf){
	this.conf = conf;
}

LogLizer_stream.prototype.main = function(conf, data, callback){
	callback(this.conf.dbName, data);
}

exports.LogLizer_stream = LogLizer_stream;