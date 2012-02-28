var mongo = require('mongodb');


var LogLizer_db = function(){
	this.db.open(function(){});
}

LogLizer_db.prototype.db = new mongo.Db('LogLizer', new mongo.Server(LLconf.globals.mongodb.host, LLconf.globals.mongodb.port, {}), {});

LogLizer_db.prototype.insert = function(dbName, data){
	this.db.collection(dbName, function(err, collection){
		if (err)
			return;
		collection.insert(data, function(){});
	});
}

LogLizer_db.prototype.find = function(collection, query, callback){
	this.db.collection(collection, function(err, collection){
		collection.find(query).toArray(function(err, results) {
			callback(results);
		});
	});
}

LogLizer_db.prototype.group = function(collection, find, init_state, reduce, finalize, callback) {
	db.collection(collection).group([], find, init_state, reduce, finalize, true, function(err, items){
		callback(err, items);
	});
}

exports.LogLizer_db = LogLizer_db;