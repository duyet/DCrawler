'use strict';

var url = require('url');

exports.getFullPath = function(baseUrl, u) {
	u = u || '';
	var rex = /^http\:\/\/tinhte\.vn/;

	if (!u.match(rex)) {
		u = url.resolve(baseUrl, u);
	}

	return u;
}