var LogLizer_stream = function(conf){
	this.conf = conf;
	
	this.menu = [
		"substream",
		"substream1"
	];
}

LogLizer_stream.prototype.main = function(conf, data, callback){
	callback(this.conf.dbName, data);
}

LogLizer_stream.prototype.web = {
	"substream" : function(req, res){
		res.render(__dirname + "/views/substream");	
	},
	"substream1" : function(req, res){
		res.render(__dirname + "/views/substream1");	
	},
	"data.:json" : function(req, res){
		res.json({ test : "mumbling"});
	}
};

exports.LogLizer_stream = LogLizer_stream;