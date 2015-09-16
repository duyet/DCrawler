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
	title: String,
	category: String,
	content: String
});

var content = db.model('Contents', ContentsScheme);
module.exports = content;
