
var uuid = require('node-uuid');
var cache = require('lru-cache')();
var crypto = require('crypto');


var Media = function(){
	return {
		title: '',
		type : '',
		description : '',
		poster : '',
		playlist : null,
		provider : {media: {}, metadata : {}},

		getPlaylist : function() {
			if(this.playlist === null) {
				// get it from provider
				this.playlist = [];
			}
			return this.playlist;
		}
	};
}

function MediaFactory(provs){
	var self = this;
	var providers = provs;

	self.getMedia = function(prov, key) {
		var name = 'braitsch';
		
		var media_id = crypto.createHash('md5').update(prov.id + '|' + key).digest('hex');
		var media = cache.get(media_id);

		if(!media) {
			media = new Media();
			media.uuid = uuid.v1();
			media.provider.media = {
				'id' : prov.id,
				'key': key,
			};
			
			cache.set(media_id, media);

		}

		return media;
	}


}


module.exports = function(providers) {
	return new MediaFactory(providers);
}


