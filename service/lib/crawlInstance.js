'use strict';


var path = require('path');
var fs = require('fs');

var _ = require('lodash');
var mongoose = require('mongoose');

var Crawler = require('./crawler');
var db = require('../config/db');

(function() {
	var Rule = function(selector, type) {
		this.selector = selector || [];
		if (!_.isArray(this.selector)) this.selector = [this.selector];

		this.type = type || 'text';
	};

	var Instance = function(options) {
		var defaults = {
			skipDuplicates: true,

			product: '',
			model: 'RawData',
			urls: [],
			source: '',
			rules: {
				navigator: [],
				container: [],
				el: {
					content: [],
				}
			}
		};

		this.rootDir = path.join(__dirname, '../../');

		if (_.isString(options) && fs.existsSync(this.rootDir + options || '')) {
			this.options = require(this.rootDir + options);
		} else if (_.isString(options)) {
			throw Error("Config instance is not found: " + this.rootDir + options);
		}
		else {
			this.options = options || {};
		}

		this.options = _.merge(defaults, this.options);

		// Make rules instance of Rule
		var that = this;
		if (this.options.rules) {
			if (this.options.rules.el) {
				_.each(this.options.rules.el, function(value, key) {
					console.log(key, value);
					if (value instanceof Rule === false) that.options.rules.el[key] = new Rule(value);
				});
			}
		}

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

	Instance.prototype.getContentXPath = function(rules) {
		if (!_.isArray(rules)) rules = [rules];

		return rules.join(',');
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
			var container = $(that.getContentXPath(that.rules.container));
			if (container.length) {
				container.each(function(index, block) {
						
				});
			}
		}
	};

	module.exports = Instance;
}).call(this);