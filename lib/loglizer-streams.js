var LogLizer_streams = function(conf_globs){
	
	dir = __dirname + "/../streams/";
	this.streams = {};
	
	for ( streamjs in conf_globs.streams ){
		tmp_strm = require(dir + streamjs).LogLizer_stream;
		this.streams[streamjs] = new tmp_strm(conf_globs.streams[streamjs]);
	}
}

LogLizer_streams.prototype.stream = function(conf, data){
	for ( i in this.streams ){
		this.streams[i].stream(conf, data);
	}
}

exports.LogLizer_streams = LogLizer_streams;