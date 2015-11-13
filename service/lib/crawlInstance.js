'use strict';


var path = require('path');
var fs = require('fs');

var _ = require('lodash');
var mongoose = require('mongoose');

var Crawler = require('./crawler');
var db = require('../config/db');

(function() {
	var Instance = function(options) {
		var defaults = {
			skipDuplicates: true,

			product: '',
			model: 'RawData',
			urls: [],
			source: '',
			rules: {
				navigator: [],
				content: []
			}
		};

		if (fs.existsSync(options || '')) {
			this.options = require(options);
		} else {
			this.options = options || {};
		}

		this.options = _.merge(defaults, this.options);

		// Model
		this.models = {};
		this.models.queue = require('../models/queue');
		this.models.contents = require('../models/contents');
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

	Instance.prototype.updateNavigatorRules = function(rule) {
		if (!_.isArray(rule)) rule = [rule];

		this.options.rules.navigator = rule;
	};

	Instance.prototype.updateContentRules = function(content) {
		if (!_.isArray(content)) content = [content];

		this.options.rules.content = content;
	};

	Instance.prototype.start = function() {
		this.instanceConfig = this.options;

		var that = this;
		this.instanceConfig.callback = function(error, result, $) {
			if (!result || !result.request) {
				return;
			}

			var currentUrl = result.request.href || '';
			// =====================================================
			// Parse content
			var posts = $(that.rules.content[0]);

		}
	};

	module.exports = Instance;
}).call(this);