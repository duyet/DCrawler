'use strict';

var _ = require('lodash');
var args = require('optimist').argv;

var Instance = require('./lib/crawlInstance');

var i = new Instance(args);

console.log("Config: ", i.getConfig());