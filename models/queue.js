'use strict';

var mongoose = require('mongoose');

var db = require('../config/db');
var helper = require('../lib/helper');

var QueueScheme = new mongoose.Schema({
	id: {
		type: String,
		index: {
			unique: true
		}
	},
	queue_root_id: String,
	url: String,
	seen: {
		type: Boolean,
		default: false
	},
	parent: {
		type: String,
		default: ''
	},
	created: {
		type: Date,
		default: Date.now
	}
});

QueueScheme.statics.addUrl = function(url, parent, callback) {
	if (!helper
		.isUrl(url)) return false;
	return new this({
		id: helper.getUrlId(url),
		url: url,
		seen: false,
		parent: helper.getUrlId(parent)
	}).save(function(err) {
		if (callback !== undefined) callback(err);
	});
}

QueueScheme.statics.findById = function(urlId) {
	return this.find({
		id: urlId
	});
}

QueueScheme.statics.findByParent = function(parentUrl) {
	if (!helper.isUrlId(parentUrl)) {
		parentUrl = helper.getUrlId(parentUrl);
	}

	return this.find({
		parent: parentUrl
	});
}

QueueScheme.statics.findByUrl = function(name, cb) {
	return this.find({
		url: new RegExp(name, 'i')
	}, cb);
}

QueueScheme.statics.findId = function(id, cb) {
	return this.find({
		id: id
	}, cb);
}

QueueScheme.statics.dequeue = function(next) {
	this.findOne({
		seen: false
	}).limit(1).exec(function(err, link) {
		if (!link) return next(false);

		link.seen = true;
		link.save();

		next(link.url);
	});
}

QueueScheme.statics.dequeues = function(num, next) {
	for (var i = 0; i < num; i++) {
		this.dequeue(next);
	}
}

QueueScheme.statics.queue = function(url, parent, callback) {
	return this.addUrl(url, parent, callback);
}

var queue = db.model('Queue', QueueScheme);

module.exports = queue;
