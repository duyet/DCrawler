'use strict';

module.exports = {
	maxConnections : 100,
	jQuery: true,

	cache: true, // Boolean, if true stores requests in memory
	skipDuplicates: true, // Boolean, if true skips URIs that were already crawled, without even calling callback() 

	proxies: [],

	// This will be called for each crawled page 
	callback : function (error, result, $) {
		//$('a').each(function(index, a) {
		//	var toQueueUrl = $(a).attr('href');
		//	c.queue(toQueueUrl);
		//});
	},

	onDrain: function() {
		console.log('Finish!');
		process.exit(1);
	}
}