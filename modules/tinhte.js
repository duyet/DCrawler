'use strict';

var baseUrl = 'http://tinhte.vn';

module.exports = function(c) {
	c.queue([{
	    uri: baseUrl,
	    callback: function (error, result) {
	        console.log('Grabbed', result.body.length, 'bytes');
	    }
	}]);
}