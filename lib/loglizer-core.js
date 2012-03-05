var LogLizer_core = function(glob_conf, conf){
	this.conf = conf;
	this.glob_conf = glob_conf;
}

LogLizer_core.prototype.load_conf = function(glob_conf, conf){
	this.conf = conf;
	this.glob_conf = glob_conf;
}

LogLizer_core.prototype.process = function(logname, filename, regexp, callback){
	this.tail_inst = LLutils.tail(this, logname, filename, function(that, logname, data){
		LLutils.parser(that, logname, data, regexp, callback);
	});
}

LogLizer_core.prototype.to_streams = function(data_arr){
	LLdb.insert("main_logs", data_arr);
	LLstreams.stream(this.conf, data_arr);
}

LogLizer_core.prototype.main = function(){
	this.process(this.conf.name, this.conf.log_file, new LogLizer_regexp(this.conf.log_format), this.to_streams);
}

LogLizer_core.prototype.stop = function(){
	LLutils.tn.stop(this.tail_inst);
}

LogLizer_core.prototype.restart = function(){
	this.stop();
	this.main();
}

exports.LogLizer_core = LogLizer_core;