'use strict';

var helper = require('../lib/helper');
var queue = require('../models/queue');

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
		var regex = [
			'.PageNav > nav a', 
			'#navigation a', 
			'.primaryContent > h2.subHeading > a'
		];

		regex.forEach(function(m) {
			getQueueLink(m, $, function(link) {
				link = helper.getFullPath(baseUrl, link);
				
				FoundedLink.queue(link);

				var fs = require('fs');
				fs.appendFile("logs/tinhte.logs.txt", link + "\n", function(err) {
					if(err) {
						return console.log(err);
					}
				}); 

				// Add that to Queue
				console.log('Add to queue ', link);
	        	c.queue(link);

	        	queue.queue(link, result.uri);
	        });	
		});
	};

	var startUrl = queue.dequeue();

	console.log('Start url: ', startUrl);

	// Start from root
	//var c = new Crawler(config);
	//c.queue(startUrl);
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

var checkDeny = function(url) {
	var regex = [
		'tinhte.vn/search/',
		'tinhte.vn/login/',
	]; 
}