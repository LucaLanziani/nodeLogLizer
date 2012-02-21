var LogLizer_streams = function(conf_globs){
	
	dir = __dirname + "/../streams/";
	this.streams = [];
	
	for ( streamjs in conf_globs.streams ){
		tmp_strm = require(dir + streamjs + "/" + streamjs).LogLizer_stream;
		this.streams.push( new tmp_strm(conf_globs.streams[streamjs]) );
	}
}

LogLizer_streams.prototype.callbackStreams = function(dbName, data){
	LLutils.insert(dbName, data);
}

LogLizer_streams.prototype.stream = function(conf, data){
	this.streams.forEach(function(stream){
		process.nextTick(function(){
			stream.main.call(stream, conf, data.clone(), LLstreams.callbackStreams)
		});	
	});
}

exports.LogLizer_streams = LogLizer_streams;