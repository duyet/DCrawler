'use strict';

var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var Crawler = require('./crawler');

(function() {
	var Instance = function(options) {
		var defaults = {
			skipDuplicates: true,
		};

		if (fs.existsSync(options || '')) {
			this.options = require(options);
		} else {
			this.options = options || {};
		}

		this.options = _.merge(defaults, this.options);
	};

	Instance.prototype.setConfigFrom = function(configFile) {
		try {
			var optionFile = require(configFile);
			if (optionFile) this.options = _.merge(this.options, optionFile);
		} catch (e) {
			console.log(e);
		}
	};

	Instance.prototype.getConfig = function() {
		return this.options || {};
	};

	Instance.prototype.start = function() {
	};

	module.exports = Instance;
}).call(this);