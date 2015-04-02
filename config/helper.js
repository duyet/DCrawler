'use strict';

exports.getUrlId = function(url) {
	if (url == undefined) return '';
	
	return url.replace(/([^a-z0-9])|(^http)/gi, '');
}

exports.isUrlId = function(id) {
	var checkUrlId = new RegExp(/^([a-z0-9]+)$/gi);
	return checkUrlId.test(id);
}