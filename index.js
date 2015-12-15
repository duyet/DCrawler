'use stricts';

/**
 * Project: DCrawler
 *
 * Date: 03/2015
 * Author: Van-Duyet Le <me@duyetdev.com>
 */
var exec = require('child_process').exec, child;
var Crawler = require('./lib/crawler');
var url = require('url');
var config = require('./config');


console.log('Startup system: ' + config.global.name);

var modulePath = require("path").join(__dirname, config.global.instancesDir);
require("fs").readdirSync(modulePath).forEach(function(f) {
	if (f.match(/^.+\.js$/g) !== null && config.global.ignoreModule.indexOf(f) == -1) {
		var childCrawlerInstanceCmd = 'node instance ' + config.global.instancesDir + '/' + f;
		child = exec(childCrawlerInstanceCmd, function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
	});
}
});
