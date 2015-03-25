'use stricts';

var Crawler = require('crawler');
var url = require('url');
var config = require('./config');

var c = new Crawler(config.crawler);

var modulePath = require("path").join(__dirname, config.global.modulesDir);

require("fs").readdirSync(modulePath).forEach(function(f) {
  require('./' + config.global.modulesDir + '/' + f)(c);
});
