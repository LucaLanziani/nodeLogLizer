var LogLizer_stream = function(conf){
	this.conf = conf;
}

LogLizer_stream.prototype.stream = function(conf, data){
	console.log(data);
}

exports.LogLizer_stream = LogLizer_stream;