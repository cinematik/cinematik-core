
var providers = require('./providers/providers.js');
var media = require('./media')(providers);
providers.init(media);

/**
 * Instantiates Cinematik Core.
 * @class Represents an instance of Cinematik Core. Only one can be used.
 */

function CinematikCore() {
	var self = this;

	self.search = function(string) {
		var results = providers.media.search(string);
		return results;
	}
}

module.exports = new CinematikCore();
