/* globals */
global.LogLizer_regexp = require("./lib/loglizer-regexp.js").LogLizer_regexp;		// require extended regexp class
/* end globals require */

/* not globals */
var LogLizer_core = require("./lib/loglizer-core.js").LogLizer_core;				// require core class
var LogLizer_streams = require("./lib/loglizer-streams.js").LogLizer_streams;		// require streams class
var LogLizer_utils = require("./lib/loglizer-utils.js").LogLizer_utils;				// require utils class
var LLconf = require("./conf.js").conf;												// require configuration from conf.js
/* end local require */

global.LLutils = new LogLizer_utils();												// global instance for utils
global.LLstreams = new LogLizer_streams(LLconf.globals);							// global instance for streams

var LLcores = [];																
for ( i in LLconf.logs ){																		
	LLcores[i] = new LogLizer_core(LLconf.globals, LLconf.logs[i]);					// each configuration, create new core instance 
	LLcores[i].main();																// launch core main 
}