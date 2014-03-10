
var loader = require('auto-loader');
var bases = require('./base.js');



var	providers = {
	media : {
		search : function(string) {
			// @todo: Wait for provider initialization before calling.
			return this.__list[0].search(string);
		},
		__list : [],
	}, 
	metadata : {
		setMetadata : function(media) {
		},
		__list : [],
	}
};

function loadProviders() {
	var modules = loader.load(__dirname);
	console.log("Modules loaded",  modules);

	for (var module in modules) {
		if(module == 'base' || module == 'providers' || module == '_path') {
			delete modules[module];
			continue;
		}
		var provider = new modules[module]();
		console.log(module, provider);

		if(provider instanceof bases.MediaProvider) {
			providers.media.__list.push(provider);
		}

		if(provider instanceof bases.MetadataProvider) {
			providers.metadata.__list.push(provider);
		}
	}

	console.log("Providers", providers); 

	return providers;
}


module.exports = loadProviders();