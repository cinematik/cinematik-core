var inherit = require('inherit');
var uuid = require('node-uuid');

var Media = inherit({
	__constructor : function() {
		this.uuid = uuid.v1();
	},
	provider : {media: {}, metadata : {}}
});

module.exports = Media;