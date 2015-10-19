'use strict';

var format = require("string-template");
var url = require('url');
var moment = require('moment');

var activeLogs = false;
var numOfThread = 1;
var baseUrl = 'http://tinhte.vn';

var product = 'redmi-note-2';
var source = 'tinhte';

var start = [
	'https://tinhte.vn/threads/tren-tay-xiaomi-redmi-note-2-4-trieu-co-man-hinh-5-5-full-hd-chip-tam-nhan-sac-nhanh.2500606'
];

var helper = require('../lib/helper');
var queue = require('../models/queue');
var contents = require('../models/contents');

var FoundedLink = new Array();
var postCouter = 0;

// =====================
var mainContentDom = 'div.messageInfo.primaryContent';

var isFetchedRouter = false;
var routerDom = [
	// '#content > div > div > div.uix_contentFix > div > div > div:nth-child(6) > div.PageNav > nav > a', // Main menu
];
var postDom = ''; // Posts
var pagingDom = '#content > div > div > div.uix_contentFix > div > div > div:nth-child(6) > div.PageNav > nav > a'; // Main menu

module.exports = function(Crawler, config) {
	// =======================================================
	// Config the callback
	config.skipDuplicates = true;
	config.callback = function(error, result, $) {
		if (!result || !result.request) {
			console.log('!!result');
			return;
		}

		var currentUrl = result.request.href || '';

		// =====================================================
		// Parse content
		var posts = $(mainContentDom);

		if (posts.length) {
			posts.each(function(index, _post) {
				var post = $(_post).children('div.messageContent > article > blockquote');

				var parsedUrl = url.parse(result.request.href);
				var _content = config.global.skipHtml ? $(post).text() : $(post).html();
				var postContent = helper.makeContent(_content);
				var postCategory = '';
				var commentDate = moment("26/8/15 at 13:52", "DD/MM/YY [at] hh:mm");

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
					url_id: helper.getUrlId(postContent.substr(1, 50)),
					url: currentUrl,
					product: product,
					source: source,
					text: postContent,
					commentDate: commentDate,
					crawlDate: new Date(),
				}).save(function(err) {
					if (err) {
						return console.log('Error when save post.', err);
					} else {
						console.log("Saved [" + postCouter++ + "]");
					}
				});
			})
		}

		getQueueLink(pagingDom, $, function(link) {
			if (!helper.isUrl(link)) {
				link = helper.resolveUrl(baseUrl, link);
			}

			if (helper.isUrl(link)) {
				console.log('=>Added to queue ', link);
				c.queue({
					uri: link,
					priority: 3
				});
			}
		});

		// =====================================================
		// Fetch next URL and Add to Queue
		if (!isFetchedRouter) {
			isFetchedRouter = true;
			routerDom.forEach(function(m) {
				// Get links from result data
				getQueueLink(m, $, function(link) {
					// For each link parsed

					if (!helper.isUrl(link)) {
						link = helper.resolveUrl(result.request.href, link);
					}

					if (helper.isUrl(link)) {
						console.log('Added to queue ', link);
						c.queue({
							uri: link,
							priority: 9
						});
					}
				});
			});
		}

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
