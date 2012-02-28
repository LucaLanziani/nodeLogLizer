var LogLizer_stream = function(conf){
	this.conf = conf;

	this.menu = [
		"substream",
		"substream1"
	];
}

LogLizer_stream.prototype.main = function(conf, data){
	LLdb.insert(this.conf.dbName, data);
}

LogLizer_stream.prototype.web = {
	"substream" : function(req, res){
		res.render(__dirname + "/web/views/substream");	
	},
	"substream1" : function(req, res){
		res.render(__dirname + "/web/views/substream1");	
	},
	"data.:json" : function(req, res){
		res.json({ test : "mumbling"});
	}
};

exports.LogLizer_stream = LogLizer_stream;