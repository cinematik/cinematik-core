var inherit = require('inherit');

var Provider = inherit({
	__constructor : function() {
		this.prov_type = [];
	}
});

module.exports.MediaProvider = inherit(Provider, {
	__constructor : function(id) {
		this.__base();
		this.prov_type.push('media');
	},
}, 
{
	id: new Error("Please set an ID for the provider"),
	search : function() {
		return new Error("Please override this function");	
	},
});

module.exports.MetadataProvider = inherit(Provider, {
	__constructor : function(id) {
		this.__base();
		this.prov_type.push('metadata');
	},
}, 
{
	id: new Error("Please set an ID for the provider"),
	setMetadata : function() {
		return new Error("Please override this function");	
	},
});