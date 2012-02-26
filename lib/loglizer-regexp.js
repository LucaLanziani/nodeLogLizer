var LogLizer_regexp = function(regexp){									// extended regexp class, with map reference. Ex: '({test}.*)'
																		// will return an object like { test : 'result of (.*)' }
	matchgrp = /\(\{([^\}]+)\}/g;										// match ({something}
	res_keys = matchgrp.execAll(regexp);
	this.keys = [];
	
	if ( ! res_keys )
		res_keys = [];
	
	for ( i = 0; i < res_keys.length; i++ ){
		this.keys[i] = res_keys[i][1];
	}

	this.regexp = new RegExp(regexp.replace(/\(\{[^\}]+\}/g, "("));
}

LogLizer_regexp.prototype.exec = function(string){
	r_ret = this.regexp.exec(string);
	ret = {};
	
	for ( i = 1; i < r_ret.length; i++ ){
		ret[this.keys[i-1]] = r_ret[i];
	}
	return ret;
}

exports.LogLizer_regexp = LogLizer_regexp;