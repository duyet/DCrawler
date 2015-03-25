'use strict';

var helper = require('../lib/helper');

var baseUrl = 'http://tinhte.vn';

Array.prototype.queue = function (u) {
	console.log(this.length +  '. Add ' + u + '...');
	this.push(u);

	return this;
}
var FoundedLink = new Array();
																																												
module.exports = function(Crawler, config) {
	config.callback = function (error, result, $) {

		// Fetch next URL and Add to Queue
		var fetchUrlFrom = [
			'.PageNav > nav a', 
			'#navigation a', 
			'.primaryContent > h2.subHeading > a'
		];

		fetchUrlFrom.forEach(function(m) {
			getQueueLink(m, $, function(link) {
				link = helper.getFullPath(baseUrl, link);
				
				FoundedLink.queue(link);

				// Add that to Queue
				console.log('Add to queue ', link);
	        	c.queue(link);
	        });	
		});
	};

	// Start from root
	var c = new Crawler(config);
	c.queue(baseUrl);
}

var getQueueLink = function(regex, $, callback) {
	var queueLink = $(regex);

	if (queueLink.length) {
		queueLink.each(function(index, a) {
			var link = $(a).attr('href');
			if (link != undefined) {
				if (callback != undefined) {
					callback(link);
				}
			}
		});
	}
}