var LogLizer_users = function(){}

LogLizer_users.prototype.connect = function(){
	this.db = new mongo.Db('LogLizer', new mongo.Server(LLconf.globals.mongodb.host, LLconf.globals.mongodb.port, {}), {});
	this.db.open(function(){});
}

LogLizer_users.prototype.add = function(user, conf, cb){
	
}

LogLizer_users.prototype.del = function(user, cb){

}

LogLizer_users.prototype.edit = function(user, conf, cb){

}

LogLizer_users.prototype.exist = function(user, pass, cb){
	cb(user, { admin : true }, true);
}

exports.LogLizer_users = LogLizer_users;