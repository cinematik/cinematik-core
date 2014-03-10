"use strict";

var express = require('express');
var cinematik = require('./cinematik-core');

function convertThis() {
	var app = express();

	app.use(express.bodyParser());

	app.get('/search', function(req, res) {
		var query = req.query.query;
		console.log('Searching for '+query);

		var results = cinematik.search(query);
		res.json(results);
	});

	app.listen(process.env.PORT || 4500);
}


exports.convert = convertThis;
