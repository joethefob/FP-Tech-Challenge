/*
 * Serve JSON to our AngularJS client
 */
var express     = require('express');
var https       = require('https');
var q           = require('q');
var api         = express.Router();
var db          = require('../config/db').connection;

function parseColourCodes(colour_code_str) {
	var colours = [];
	var colour_codes = colour_code_str.split(';');
	for (var i = 0; i < colour_codes.length; ++i) {
		var colour = colour_codes[i].split(':');
		colours.push({ "colour_code": colour[0], "RGB": colour[1], "name": colour[2] });
	}

	return colours;
}

function parseSizeCodes(size_code_str) {
	var sizes = [];
	var size_codes = size_code_str.split(';');
	for (var i = 0; i < size_codes.length; ++i) {
		var size = size_codes[i].split(':');
		sizes.push({ "size_code": size[0], "size": size[1] });
	}

	return sizes;
}

// API endpoint for /api/apparel
api.get('/api/apparel/:styleCode?', function(req, res) {
	var styleCode = req.params["styleCode"];

	// If styleCode is undefined, send back a list of style codes
	if (typeof styleCode === "undefined") {
		db.query('SELECT brand, style_code FROM apparel', function(err, rows, fields) {
			if (err) throw err;
			res.send(rows);
		});
	} 
	// Otherwise, send back a list of colour codes and size codes
	else {
		db.query("SELECT color_codes, size_codes FROM apparel WHERE apparel.style_code='" + styleCode + "'", function(err, rows, fields) {
			if (err) throw err;

			if (rows.length < 1) {
				console.log("Style Code not found!");
				res.send(null);
			} else {
				res.send({
					"colours": parseColourCodes(rows[0].color_codes),
					"sizes": parseSizeCodes(rows[0].size_codes)
				});
			}
		});
	}
});

// API endpoint for /api/quote
api.post('/api/quote', function(req, res) {
	// Insert Quoting API code here
});

// Function for making an Inventory API call
var getApparelPrice = function getPrice(style_code, color_code, size_code) {
	var	apparelPriceDeferred = q.defer();

	// Format the Inventory API endpoint as explained in the documentation
	https.get('// INSERT INVENTORY API END POINT', function(res) {
		res.on('data', function (data) {
			// Parse response XML data here

		});
	}).on('error', function(error) {
		// Handle EDI call errors here

	});

	return apparelPriceDeferred.promise;
}

module.exports = api;