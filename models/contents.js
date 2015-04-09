'use strict';

var mongoose = require('mongoose');

var db = require('../config/db');
var helper = require('../lib/helper');

var ContentsScheme = new mongoose.Schema({
	url_id: String,
	url: String, 
	content: { type: String, index: { unique: true, dropDups: true }}
});

var content = db.model('Contents', ContentsScheme);
module.exports = content;