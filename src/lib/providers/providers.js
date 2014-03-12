var loader = require('auto-loader');
var bases = require('./base.js');

/**
 * Instantiates Providers.
 * @class Represents an instance of Providers. Only one needed.
 */

function Providers() {
	var self = this;

	self.media = {
		getProvider : function(prov_id) {
			for(p in this.__list) {
				if (this.__list[p].id == prov_id) {
					return this.__list[p];
				}
			}
			return null;
		},
		search : function(string) {
			var results = {};

			for(p in this.__list) {
				provider = this.__list[p];
				if(provider.ready) {
					results[provider.id] = provider.search(string);
				}
			}

			return results;
		},
		__list : [],
	}; 

	self.metadata = {
		setMetadata : function(media) {
		},
		__list : [],
	};
	

	self.init = function(mediaModule) {
		var modules = loader.load(__dirname);
		console.log("Modules loaded",  modules);

		for (var module in modules) {
			if(module == 'base' || module == 'providers' || module == '_path') {
				delete modules[module];
				continue;
			}
			var provider = new modules[module](bases, mediaModule);
			console.log(module, provider);

			if(provider instanceof bases.MediaProvider) {
				providers.media.__list.push(provider);
			}

			if(provider instanceof bases.MetadataProvider) {
				providers.metadata.__list.push(provider);
			}
		}

		console.log("Providers", providers); 

	};


}
 
var providers = new Providers();
module.exports = providers;
