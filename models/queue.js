'use strict';

var mongoose = require('mongoose');
var db = require('../config/db');
var helper = require('../config/helper');

var QueueScheme = mongoose.Schema({
	id: { type: String, index: {unique: true, dropDups: true} },
	url: String, 
	seen: { type: Boolean, default: false },
	parent: { type: String, default: '' },
	created: { type: Date, default: Date.now }
});

QueueScheme.statics.addUrl = function(url, parent) {
	return new this({
		id: helper.getUrlId(url), 
		url: url, 
		seen: 0,
		parent: helper.getUrlId(parent)
	}).save();
}

QueueScheme.statics.findById = function(urlId) {
	return this.find({id: urlId});
}

QueueScheme.statics.findByParent = function(parentUrl) {
	if (!helper.isUrlId(parentUrl)) {
		parentUrl = helper.getUrlId(parentUrl);
	}

	return this.find({parent: parentUrl});
}

QueueScheme.statics.findByUrl = function(name, cb) {
	return this.find({ url: new RegExp(name, 'i') }, cb);
}

QueueScheme.statics.findId = function(id, cb) {
	return this.find({ id: id }, cb);
}

QueueScheme.statics.dequeue = function() {
	var url = '';
	return this.findOne({seen: false}, function(err, link) {
		if (!link) return false;

		link.seen = true;
		link.save();

		url = link.url;
	});

	return url;
}

QueueScheme.statics.queue = function(url, parent) {
	return this.addUrl(url, parent);
}

var queue = db.model('Queue', QueueScheme);

module.exports = queue;