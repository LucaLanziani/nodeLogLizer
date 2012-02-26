var mongo = require('mongodb');


var LogLizer_db = function(){
	this.db.open(function(){});
}

LogLizer_db.prototype.db = new mongo.Db('LogLizer', new mongo.Server(LLconf.globals.mongodb.host, LLconf.globals.mongodb.port, {}), {});

LogLizer_db.prototype.insert = function(dbName, data){
	this.db.collection(dbName, function(err, collection){
		collection.insert(data, function(){});
	});
}

LogLizer_db.prototype.find = function(dbName, query, callback){
	this.db.collection(dbName, function(err, collection){
		collection.find(query).toArray(function(err, results) {
			callback(results);
		});
	});
}	

exports.LogLizer_db = LogLizer_db;