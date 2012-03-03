var LogLizer_stream = function(conf){
	this.conf = conf;
}

LogLizer_stream.prototype.main = function(conf, data){
	LLdb.insert(this.conf.dbName, data);
}

LogLizer_stream.prototype.web = {
	"substream" : function(req, res){
		res.render(__dirname + "/web/views/substream");	
	}
};
exports.LogLizer_stream = LogLizer_stream;