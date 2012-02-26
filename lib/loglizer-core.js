var LogLizer_core = function(glob_conf, conf){
	this.conf = conf;
	this.glob_conf = glob_conf;
}

LogLizer_core.prototype.process = function(filename, regexp, callback){
	LLutils.tail(this, filename, function(that, data){
		LLutils.parser(that, data, regexp, callback);
	});
}

LogLizer_core.prototype.to_streams = function(data_arr){
	LLdb.insert("main_logs", data_arr);
	LLstreams.stream(this.conf, data_arr);
}

LogLizer_core.prototype.main = function(){
	this.process(this.conf.log_file, new LogLizer_regexp(this.conf.log_format), this.to_streams);
}


exports.LogLizer_core = LogLizer_core;