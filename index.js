'use stricts';

/**
 * Project: DCrawler
 * 
 * Build: 03/2015
 * Author: Van-Duyet Le <lvduit08@gmail.com>
 * 
 */

var Crawler = require('./lib/crawler');
var url = require('url');

var config = require('./config');

console.log('Startup system: ' + config.global.name);


var modulePath = require("path").join(__dirname, config.global.modulesDir);
require("fs").readdirSync(modulePath).forEach(function(f) {
	if (f.match(/.+\.js/g) !== null) {
		console.log('Loading module ' + f + '...')
		require('./' + config.global.modulesDir + '/' + f)(Crawler, config);
	}
});