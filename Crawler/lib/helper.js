'use strict';
var url = require('url');
var validUrl = require('valid-url');
var db = require('../config/db');

Array.prototype.queue = function(u) {
	console.log(this.length + '. Add ' + u + '...');
	this.push(u);

	return this;
}

exports.getUrlId = function(url) {
	if (url == undefined) return '';

	return url.replace(/([^a-z0-9])|(^http)/gi, '');
}

exports.isUrlId = function(id) {
	var checkUrlId = new RegExp(/^([a-z0-9]+)$/gi);
	return checkUrlId.test(id);
}

exports.getFullPath = function(baseUrl, u) {
	u = u || '';
	var rex = /^http\:\/\/tinhte\.vn/;

	if (!u.match(rex)) {
		u = url.resolve(baseUrl, u);
	}

	return u;
}

exports.getRootUrl = function(key) {

}

exports.isUrl = function(url) {
	return validUrl.isUri(url);
}

exports.resolveUrl = function(domain, path) {
	return url.resolve(domain, path);
}

exports.makeContent = function(content) {
	return content.replace(/(\s+|\t+)/g, ' ').trim();
}
