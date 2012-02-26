RegExp.prototype.execAll = function(string) {
    var match = null;
    var matches = new Array();
    while (match = this.exec(string)) {
        var matchArray = [];
        for (i in match) {
            if (parseInt(i) == i) {
                matchArray.push(match[i]);
            }
        }
        matches.push(matchArray);
    }
    return matches;
}

Object.defineProperty(Object.prototype, "extend", {
	enumerable: false,
	value: function(from) {
        var props = Object.getOwnPropertyNames(from);
        var dest = this;
        props.forEach(function(name) {
            if (name in dest) {
                var destination = Object.getOwnPropertyDescriptor(from, name);
                Object.defineProperty(dest, name, destination);
            }
        });
        return this;
    }
});

Object.defineProperty(Object.prototype, "clone", {
	enumerable: false,
	value: function() {
    	return JSON.parse(JSON.stringify(this));
    }
});

Object.defineProperty(Object.prototype, "save", {
	enumerable: false,
	value: function(file) {
		fs = require('fs');
    	to_save = JSON.stringify(this, null, 4);
    	if ( fs.writeFileSync(file, to_save) )
    		return true;
    	else
    		return false;
    }
});

Object.defineProperty(Object.prototype, "loadJSON", {
	enumerable: false,
	value: function(json) {
    	try {
    		this = {};
			this = this.extend(require(json));
		} catch (err) {
			throw err;	
		}
    }
});