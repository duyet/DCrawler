'use strict';

var mongoose = require('mongoose');
var db = require('../config/db');
var helper = require('../config/helper');

var queue = db.model('Queue', mongoose.Schema({
	id: { type: String, index: {unique: true, dropDups: true} },
	url: String, 
	seen: { type: Boolean, default: false },
	parent: { type: String, default: '' },
	created: { type: Date, default: Date.now }
}));

queue.addUrl = function(url, parent) {
	return new this({
		id: helper.getUrlId(url), 
		url: url, 
		seen: 0,
		parent: helper.getUrlId(parent)
	}).save();
}

queue.findById = function(urlId) {
	return this.find({id: urlId});
}

queue.findByParent = function(parentUrl) {
	if (!helper.isUrlId(parentUrl)) {
		parentUrl = helper.getUrlId(parentUrl);
	}

	return this.find({parent: parentUrl});
}

queue.findByUrl = function(name, cb) {
	return this.find({ url: new RegExp(name, 'i') }, cb);
}

queue.findId = function(id, cb) {
	return this.find({ id: id }, cb);
}

queue.dequeue = function() {
	return this.findOne({seen: false});
}

queue.queue = function(url, parent) {
	return this.addUrl(url, parent);
}

module.exports = queue;