'use strict';

var mongoose = require('mongoose');

var db = require('../config/db');
var helper = require('../lib/helper');

var QueueRootScheme = new mongoose.Schema({
	id: { type: String, index: {unique: true} },
	url: String, 
	status : { type: Number, default: 1 },
	created: { type: Date, default: Date.now },
	lastrun: { type: Date, default: Date.now }
});

var queueroot = db.model('QueueRoot', QueueRootScheme);
module.exports = queueroot;