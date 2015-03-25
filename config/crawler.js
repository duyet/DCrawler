'use strict';

module.exports = {
	maxConnections : 100,
	jQuery: true,
	// This will be called for each crawled page 
	callback : function (error, result, $) {
		$('a').each(function(index, a) {
			var toQueueUrl = $(a).attr('href');
			c.queue(toQueueUrl);
		});
	}
}