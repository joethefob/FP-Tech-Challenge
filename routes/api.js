/*
 * Serve JSON to our AngularJS client
 */
var express     = require('express');
var https       = require('https');
var q           = require('q');
var api         = express.Router();
var db          = require('../config/db').connection;

// API endpoint for /api/apparel
api.get('/api/apparel/:styleCode?', function(req, res) {
	var data;
	db.query('SELECT style_code, color_codes, size_codes FROM apparel', function(err, rows, fields) {
		if (err) throw err;

		res.send(rows);
	});
	// Insert Apparel API code here

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