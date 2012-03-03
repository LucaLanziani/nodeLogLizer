var LogLizer_streams = function(conf_globs){
	
	dir = __dirname + "/../streams/";
	this.streams = [];
	this.streams_conf = {};
	
	for ( stream in conf_globs.streams ) {
		
		if ( !conf_globs.streams[stream] )
			continue;
		
		this.streams_conf[stream] = require(dir + stream + "/conf.json");
	
		tmp_strm = require(dir + stream + "/main").LogLizer_stream;
		tmp_ist = new tmp_strm(this.streams_conf[stream]);

		this.streams.push(tmp_ist);
		LLweb.submenu[stream] = this.streams_conf[stream].menu;
				
		for ( w in tmp_ist.web )
			LLweb.app.all('/streams/' + stream + '/' + w, tmp_ist.web[w]);
	}
}

LogLizer_streams.prototype.stream = function(conf, data){
	
	LLweb.io.sockets.emit('log', data);
  			
	this.streams.forEach(function(stream){
		process.nextTick(function(){
			stream.main.call(stream, conf, data.clone())
		});	
	});
}

exports.LogLizer_streams = LogLizer_streams;