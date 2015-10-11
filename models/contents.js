'use strict';

var mongoose = require('mongoose');

var db = require('../config/db');
var helper = require('../lib/helper');

var ContentsScheme = new mongoose.Schema({
	url_id: {
		type: String,
		index: {
			unique: true,
			dropDups: true
		}
	},
	url: String,
	product: String,
	source: String,
	text: String,
	commentDate: Date,
	crawlDate: Date
});

var content = db.model('Contents', ContentsScheme);
module.exports = content;
