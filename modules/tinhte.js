'use strict';

var activeLogs = false;
var numOfThread = 1;
var baseUrl = 'http://tinhte.vn';
var rootUrl = 'https://www.tinhte.vn/forums/';

var helper = require('../lib/helper');
var queue = require('../models/queue');
var contents = require('../models/contents');


Array.prototype.queue = function (u) {
	console.log(this.length +  '. Add ' + u + '...');
	this.push(u);

	return this;
}
var FoundedLink = new Array();
																																												
module.exports = function(Crawler, config) {
	// =======================================================
	// Config the callback
	config.callback = function (error, result, $) {
		if (!result || !result.request) {
			console.log('!!result');
			return false;
		}
		
		var currentUrl = result.request.href || '';

		// =====================================================
		// Parse content
		var posts = $('article .messageText');
		if (posts.length > 0) {
			posts.each(function(index, post) {
				var postContent = $(post).text();
				new contents({
					url_id: helper.getUrlId(currentUrl),
					url: currentUrl,
					content: postContent
				}).save(function(err) {
					if (err) {
						return console.log('Error when save tinhte post.', err);
					}

					
				});
			})
		}

		// =====================================================
		// Fetch next URL and Add to Queue
		var regexUrl = [
			'.PageNav > nav a', 
			'#navigation a', 
			'.scrollable .items a', // paging from /forums/
			'.primaryContent > h2.subHeading > a',
			'#content div > div.nodeText > h3 > a', // Sub forum
			'.Tinhte_XenTag_WidgetRenderer_TrendingThreadTags > ul > li> a', // TinhTeTag
			'#widget-tabs-Categorythreads div ul li a',
			'.discussionListItems div.listBlock.main > div > h3 > a',
			'#content > div > div > div.uix_contentFix > div > div > div:nth-child(4) > div.PageNav > nav > a',
			'#container-21 > div > ul > li > div > a.PreviewTooltip', 
			'h3.nodeTitle > a'
		];

		if (activeLogs) {
			console.log(result);
			require('fs').writeFile('logs/result.txt', JSON.stringify(result, null, 4), function(err) {
				console.log(err);
			});
		}

		regexUrl.forEach(function(m) {
			// Get links from result data
			getQueueLink(m, $, function(link) {
				// For each link parsed

				link = helper.getFullPath(baseUrl, link); // Get full link URL

				if (activeLogs === true) {
					require('fs').appendFile("logs/tinhte.logs.txt", helper.getUrlId(link) + "\t" + link + "\n", function(err) {
						if(err) {
							return console.log(err);
						}
					}); 
				}

				if (helper.getUrlId(currentUrl) == 'tinhtevnforumsquangcaokhuyenmai230') {
					console.log('---------------------------------------------------------------------------------');
					console.log('Child link of break point', link);
					process.exit(0);
				}

	        	//c.queue(link); // founded link with parent URL (currentUrl)
	        	queue.queue(link, currentUrl, function(err) {
	        		if (err) {
	        			console.log(err.message);

		        		require('fs').appendFile("logs/tinhte.logs.queue_error.txt", link + "\n", function(err) {
							if(err) {
								return console.log(err.message);
							}
						}); 
	        		} else {
	        			console.log('Added to queue ', link);

	        			require('fs').appendFile("logs/tinhte.logs.queue_added.txt", link + "\n", function(err) {
							if(err) {
								return console.log('Added to queue ', link);
							}
						}); 
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
			startUrl = rootUrl;
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

var checkDeny = function(url) {
	var regex = [
		'tinhte.vn/search/',
		'tinhte.vn/login/',
	]; 
}