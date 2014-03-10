
var cache = {media : {}, playables : {}};

var providers = require('./providers/providers.js');

var library = {
	search : function search(string) {
		var results = providers.media.search(string);
		return results;
	}
};

module.exports = library;
