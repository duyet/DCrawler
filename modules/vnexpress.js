'use strict';

var format = require("string-template");
var url = require('url');

var activeLogs = false;
var numOfThread = 1;
var baseUrl = 'http://{subdomain}.vnexpress.net';
var start = 'http://vnexpress.net';

var helper = require('../lib/helper');
var queue = require('../models/queue');
var contents = require('../models/contents');

var FoundedLink = new Array();
var postCouter = 0;

// =====================
var mainContentDom = '#left_calculator > div.fck_detail';
var routerDom = [
	'#menu_web a', // Main menu
	'#breakumb_web a', // Sub navigation
	'a.pagination_btn', // Pagination
	'#news_home > li > div.title_news > a', // Posts
];

module.exports = function(Crawler, config) {
	// =======================================================
	// Config the callback
	config.callback = function(error, result, $) {
		if (!result || !result.request) {
			console.log('!!result');
			return;
		}

		var currentUrl = result.request.href || '';

		// =====================================================
		// Parse content
		var post = $(mainContentDom);

		if (post.length) {
			var parsedUrl = url.parse(result.request.href);
			var _content = config.global.skipHtml ? $(post).text() : $(post).html();
			var postContent = helper.makeContent(_content);
			var postCategory = '';

			if (parsedUrl) {
				var tmp = parsedUrl.pathname || '';
				tmp = tmp.split('/');
				tmp.pop;
				tmp.map(function(i) {
					if (i) postCategory += i;
				});
			}

			new contents({
				url_id: helper.getUrlId(currentUrl),
				url: currentUrl,
				content: postContent,
				category: postCategory
			}).save(function(err) {
				if (err) {
					return console.log('Error when save tinhte post.', err);
				} else {
					console.log("Saved [" + postCouter++ + "]");
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

				if (helper.isUrl(link)) {
					queue.queue(link, currentUrl, function(err) {
						if (!err) {
							console.log('Added to queue ', link);
						}
					}); // queue on MongoDb	
				}
			});
		});

		// Finish, reload
		queue.dequeues(numOfThread, function(startUrl) {
			if (startUrl === false) {
				console.log('Stop now!!');
				return process.exit(0);
			}

			// Add start url to queue
			if (helper.isUrl(startUrl)) {
				c.queue(startUrl);
			}
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

		// Add start url to queue
		if (helper.isUrl(startUrl)) {
			console.log('Start url -->  ', startUrl);
			c.queue(startUrl);
		}
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
