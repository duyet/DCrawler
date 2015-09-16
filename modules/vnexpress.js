'use strict';

var format = require("string-template");

var activeLogs = false;
var numOfThread = 1;
var baseUrl = 'http://{subdomain}.vnexpress.net';
var start = 'http://vnexpress.net';

var helper = require('../lib/helper');
var queue = require('../models/queue');
var contents = require('../models/contents');

var FoundedLink = new Array();

// =====================
var mainContentDom = '#left_calculator > div.fck_detail';
var routerDom = [
	'#menu_web a', // Main menu
	'#breakumb_web a', // Sub navigation
	'a.pagination_btn' // Pagination
];

module.exports = function(Crawler, config) {
	// =======================================================
	// Config the callback
	config.callback = function(error, result, $) {
		if (!result || !result.request) {
			console.log('!!result');
			return false;
		}

		var currentUrl = result.request.href || '';

		// =====================================================
		// Parse content
		var post = $(mainContentDom);
		if (post.length) {

			var _content = config.global.skipHtml ? $(post).text() : $(post).html();
			var postContent = helper.makeContent(_content);

			console.log(postContent);

			new contents({
				url_id: currentUrl,
				url: currentUrl,
				content: postContent
			}).save(function(err) {
				if (err) {
					return console.log('Error when save tinhte post.', err);
				}
			});

		}

		// =====================================================
		// Fetch next URL and Add to Queue
		routerDom.forEach(function(m) {
			// Get links from result data
			getQueueLink(m, $, function(link) {
				// For each link parsed

				if (!helper.isUrl(link)) {
					link = helper.resolveUrl(result.request.href, link);
				}

				queue.queue(link, currentUrl, function(err) {
					if (err) {
						//	console.log(err.message);
					} else {
						console.log('Added to queue ', link);
					}
				}); // queue on MongoDb
			});
		});

		// Finish, reload
		queue.dequeues(numOfThread, function(startUrl) {
			if (startUrl === false) {
				console.log('Stop now!!');
				return process.exit(0);
			}

			c.queue(startUrl);
		});
	};

	// =======================================================
	// Init Crawler system
	var c = new Crawler(config);

	// =======================================================
	// Dequeue and start
	queue.dequeue(function(startUrl) {
		if (startUrl === false) {
			startUrl = start;
			queue.addUrl(startUrl);
		}

		console.log('Start url -->  ', startUrl);

		// Add start url to queue
		c.queue(startUrl);
	});
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
