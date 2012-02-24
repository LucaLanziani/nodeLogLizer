require("./lib/extends.js");														// require extends 

/* globals */
global.LogLizer_regexp = require("./lib/loglizer-regexp.js").LogLizer_regexp;		// require extended regexp class
global.LLconf = require("./conf.js").conf;												// require configuration from conf.js
/* end globals require */

/* not globals */
var LogLizer_core = require("./lib/loglizer-core.js").LogLizer_core;				// require core class
var LogLizer_web = require("./lib/loglizer-web.js").LogLizer_web;					// require web class
var LogLizer_utils = require("./lib/loglizer-utils.js").LogLizer_utils;				// require utils class
var LogLizer_streams = require("./lib/loglizer-streams.js").LogLizer_streams;		// require streams class
/* end local require */

/* global instance */
global.LLutils = new LogLizer_utils();												// global instance for utils
global.LLweb = new LogLizer_web(LLconf.globals);									// global instance for web server
global.LLstreams = new LogLizer_streams(LLconf.globals);							// global instance for streams
/* end global instance */

LLconf.version = "0.1a";
LLweb.start();

var LLcores = [];																
for ( i in LLconf.logs ){																		
	LLcores[i] = new LogLizer_core(LLconf.globals, LLconf.logs[i]);					// each configuration, create new core instance 
	LLcores[i].main();																// launch core main 
}