var inherit = require('inherit');

var Provider = inherit({
	__constructor : function() {
		this.prov_type = [];
	},
	ready : false,
},
{
	id: new Error("Please set an ID for the provider"),
});

module.exports.MediaProvider = inherit(Provider, {
	__constructor : function(id) {
		this.__base();
		this.prov_type.push('media');
	},
}, 
{
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
	setMetadata : function() {
		return new Error("Please override this function");	
	},
});