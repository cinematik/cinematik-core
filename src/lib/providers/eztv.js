// Global Provider Dependencies
var inherit = require('inherit');

// Local Provider Dependencies
var cheerio = require('cheerio');
var request = require('request');
var difflib = require('difflib');
var Q = require('q');



module.exports = function(bases, mediaModule){


	var EZTVProvider = inherit(bases.MediaProvider, {

		id : 'eztv',
		eztvUrl : 'http://eztv.it',
		eztvProxy : 'http://eztv-proxy.net',
		jqs : {},
		showlist : {},

		__constructor: function(){
			var deferred = Q.defer
			this.__base();
			var promise = this._getShowList();
			var self = this;
			Q.when(promise).then(function(){
				console.log("EZTV Provider Ready")
				self.ready = true;
			}, function(error){
				console.log("EZTV Provider unanble to fetch show list from EZTV", error);
			});
			
		},

		search : function(string) {
			var results = [];

			var showTitles = Object.keys(this.showlist);
			results = difflib.getCloseMatches(string, showTitles, 1000);
			
			for (r in results) {
				var result = results[r];
				item = this.showlist[result];
				console.log("result", result);
				results[r] = this._getMediaFromItem(result, item.find('a').text());
			}

			return results;
		},

		_getMediaFromItem: function(title, uri) {
			var media = mediaModule.getMedia(this, uri);
			media.title = title;
			media.type = 'tv show';
			return media;
		},

		_getShowList : function() {
			var promise =  this._getjQFromEZTV('/showlist/');
			var self = this;
			return Q.when(promise).then(function(jq) {
				var showlist = {};

				jq('table.forum_header_border').eq(1).find('tr').each(function(i){
					if(i != 0 && i != 1) {
						showlist[jq(this).find('a').text()] = this;
					}
				});

				self.showlist = showlist;
				console.log('EZTV showlist loaded');
			});
		},

		_getjQFromEZTV : function(uri) {
			var deferred = Q.defer();
			var proc = this._processjQ;
			var self = this;
			var jq =  this.jqs[uri];
			 
			
			if(typeof jq == 'undefined') {
				var requestOptions = {
						url: self.eztvUrl+uri,
						headers: {
							 'User-Agent': 'Cinematik'
						}
				  };

				  request(requestOptions, function(error, response, html) {
						if (!error && response.statusCode == 200) {
						 jq = cheerio.load(html);
						 self.jqs[uri] = jq;
							deferred.resolve(jq);
						}
						else {
							deferred.fail(function(){
								requestOptions.url = self.eztvProxy + uri;
								request(requestOptions, function(error, response, html) {
									if (!error && response.statusCode == 200) {
										jq = cheerio.load(html);
									self.jqs[uri] = jq;
										deferred.resolve(jq);
									}
									else{
										deferred.reject(new Error(error))
									}
							  });
							});
						}
				  });

				
			}
			else {
				  deferred.resolve(jq);
			}

			return deferred.promise;
		},

	});

	return new EZTVProvider();
}
