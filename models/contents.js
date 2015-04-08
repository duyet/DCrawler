'use strict';

var mongoose = require('mongoose');

var db = require('../config/db');
var helper = require('../lib/helper');

var ContentsScheme = new mongoose.Schema({
	url_id: String,
	url: String, 
	content: String
});

var content = db.model('Contents', ContentsScheme);
module.exports = content;