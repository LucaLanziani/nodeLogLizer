var LogLizer_streams = function(conf_globs){
	
	dir = __dirname + "/../streams/";
	this.streams = [];
	
	for ( stream in conf_globs.streams ){
		tmp_strm = require(dir + stream + "/" + stream).LogLizer_stream;
		tmp_ist = new tmp_strm(conf_globs.streams[stream]);

		this.streams.push(tmp_ist);
		LLweb.submenu[stream] = tmp_ist.menu;
		
		for ( w in tmp_ist.web )
			LLweb.app.get('/streams/' + stream + '/' + w, tmp_ist.web[w]);
		
		LLweb.app.get('*', function(req, res, next){
			res.render('error', {
     			message: req.url + " : Not Found"
  			});
		});
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