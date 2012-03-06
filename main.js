require("./lib/extends");														// require extends 

global.LLconf_path = __dirname + "/conf.json";

/* globals */
global.LLversion = "0.1a";
global.LogLizer_regexp 	= require("./lib/loglizer-regexp").LogLizer_regexp;		// require extended regexp class
global.LLconf 			= require(LLconf_path).clone();								// require configuration from conf.js
/* end globals require */

/* not globals */
var LogLizer_core 		= require("./lib/loglizer-core").LogLizer_core;			// require core class
var LogLizer_web 		= require("./lib/loglizer-web").LogLizer_web;			// require web class
var LogLizer_utils 		= require("./lib/loglizer-utils").LogLizer_utils;		// require utils class
var LogLizer_streams 	= require("./lib/loglizer-streams").LogLizer_streams;	// require streams class
var LogLizer_db 		= require("./lib/loglizer-db").LogLizer_db;				// require database class
var LogLizer_users 		= require("./lib/loglizer-users").LogLizer_users;		// require database class
/* end local require */

/* global instance */
global.LLdb 			= new LogLizer_db();
global.LLutils 			= new LogLizer_utils();										// global instance for utils
global.LLweb 			= new LogLizer_web(LLconf.globals);							// global instance for web server
global.LLstreams 		= new LogLizer_streams(LLconf.globals);						// global instance for streams
global.LLusers			= new LogLizer_users(LLconf.globals.mongodb);
global.LLcores 			= [];	
/* end global instance */

ret = LLutils.check_conf(LLconf);
if ( ret.error ){
	throw "conf.json error: " + ret.type;
}

LLweb.start();
															
for ( i in LLconf.logs ){																		
	LLcores[i] = new LogLizer_core(LLconf.globals, LLconf.logs[i]);					// each configuration, create new core instance 
	LLcores[i].main();																// launch core main 
}