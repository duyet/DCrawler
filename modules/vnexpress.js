'use strict';

var format = require("string-template");
var url = require('url');

var activeLogs = false;
var numOfThread = 1;
var baseUrl = 'http://{subdomain}.vnexpress.net';
var start = [
	'http://vnexpress.net',
	'http://giaitri.vnexpress.net',
	'http://suckhoe.vnexpress.net',
	'http://vnexpress.net/tin-tuc/khoa-hoc',
	'http://vnexpress.net/tin-tuc/the-gioi',
	'http://sohoa.vnexpress.net/'
];

var helper = require('../lib/helper');
var queue = require('../models/queue');
var contents = require('../models/contents');

var FoundedLink = new Array();
var postCouter = 0;

// =====================
var mainContentDom = '#left_calculator > div.fck_detail';
var routerDom = [
	//'#menu_web a', // Main menu
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
				tmp.shift();
				tmp.pop();
				tmp.map(function(i) {
					if (i) postCategory += i + '/';
				});
				postCategory = postCategory.substring(0, postCategory.length - 1);
			}

			new contents({
				url_id: helper.getUrlId(currentUrl),
				url: currentUrl,
				content: postContent,
				category: postCategory
			}).save(function(err) {
				if (err) {
					return console.log('Error when save post.', err);
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
					console.log('Added to queue ', link);
					c.queue(link);
				}
			});
		});
	};

	// =======================================================
	// Init Crawler system
	var c = new Crawler(config);
	for (var i = 0; i < start.length; i++)
		c.queue(start[i]);
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
