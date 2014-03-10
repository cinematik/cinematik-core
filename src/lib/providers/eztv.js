// Global Provider Dependencies
var inherit = require('inherit');
var bases = require('./base');

// Local Provider Dependencies
var cheerio = require('cheerio');
var request = require('request');
var difflib = require('difflib');

var EZTVProvider = inherit(bases.MediaProvider, {

	id : 'eztv',
	eztvUrl : 'http://eztv.it',
	eztvProxy : 'http://eztv-proxy.net',
	jqs : {},
	showlist : {'testmovie' : {}},

	__constructor: function(){
		this.__base();
		this._getShowList();
	},

	search : function(string) {
		var results = [];

		var showTitles = Object.keys(this.showlist);
		results = difflib.getCloseMatches(string, showTitles, 1000);
		
		return results;
	},

	_getShowList : function() {
		this._getjQFromEZTV('/showlist/', this._processShowList);
	},

	_processShowList : function(self, jq) {
		var showlist = {};

		jq('table.forum_header_border').eq(1).find('tr').each(function(i){
			if(i != 0 && i != 1) {
				showlist[jq(this).find('a').text()] = this;
			}
		});

		self.showlist = showlist;
		console.log('EZTV showlist loaded');

	},

	_getjQFromEZTV : function(uri, callback) {

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
	            	proc(self, uri, cheerio.load(html), callback);
	            }
	        });

			
		}
		else {
			proc(self, uri, jq, callback);
		}
			
	},

	_processjQ : function(self, uri, jq, callback) {
		self.jqs[uri] = jq;
		callback(self, jq);
	}
});

module.exports = EZTVProvider