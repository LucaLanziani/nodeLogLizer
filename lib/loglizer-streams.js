var LogLizer_streams = function(conf_globs){
	
	dir = __dirname + "/../streams/";
	this.streams = [];
	
	for ( stream in conf_globs.streams ){
		tmp_strm = require(dir + stream + "/main").LogLizer_stream;
		tmp_ist = new tmp_strm(conf_globs.streams[stream]);

		this.streams.push(tmp_ist);
		LLweb.submenu[stream] = tmp_ist.menu;
				
		for ( w in tmp_ist.web )
			LLweb.app.all('/streams/' + stream + '/' + w, tmp_ist.web[w]);
	}
}

LogLizer_streams.prototype.stream = function(conf, data){
	this.streams.forEach(function(stream){
		process.nextTick(function(){
			stream.main.call(stream, conf, data.clone())
		});	
	});
}

exports.LogLizer_streams = LogLizer_streams;