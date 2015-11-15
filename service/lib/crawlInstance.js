'use strict'

var path = require('path')
var fs = require('fs')
var url = require('url')

var _ = require('lodash')
var mongoose = require('mongoose')

var Crawler = require('./crawler')
var db = require('../config/db')

;(function () {
  var Rule = function (selector, type) {
    this.selector = selector || []
    if (!_.isArray(this.selector)) this.selector = [this.selector]

    this.type = type || 'text'
    this.toString = function () {
      return this.selector.join(',')
    }
  }

  var Instance = function (options) {
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
          date: []
        }
      }
    }

    this.rootDir = path.join(__dirname, '../../')

    if (_.isString(options) && fs.existsSync(this.rootDir + options || '')) {
      this.options = require(this.rootDir + options)
    } else if (_.isString(options)) {
      throw Error('Config instance is not found: ' + this.rootDir + options)
    } else {
      this.options = options || {}
    }

    this.options = _.merge(defaults, this.options)

    // Make rules instance of Rule
    var that = this
    if (this.options.rules) {
      if (this.options.rules.el) {
        _.each(this.options.rules.el, function (value, key) {
          console.log(key, value)
          if (value instanceof Rule === false) that.options.rules.el[key] = new Rule(value)
        })
      }
    }

    // Model
    this.models = {}
    this.models.queue = require('../models/queue')
    this.models.contents = require('../models/contents')
  }

  Instance.prototype.setConfigFrom = function (configFile) {
    try {
      var optionFile = require(configFile)
      if (optionFile) this.options = _.merge(this.options, optionFile)
    } catch (e) {
      console.log(e)
    }
  }

  Instance.prototype.getConfig = function () {
    return this.options || {}
  }

  Instance.prototype.updateNavigatorRules = function (rule) {
    if (!_.isArray(rule)) rule = [rule]

    this.options.rules.navigator = rule
  }

  Instance.prototype.updateContentRules = function (content) {
    if (!_.isArray(content)) content = [content]

    this.options.rules.content = content
  }

  Instance.prototype.getContainerRules = function () {
    if (!this.options.rules) return false
    if (!this.options.rules.container) return false

    return this.options.rules.container.join(',')
  }

  Instance.prototype.getElRules = function (el) {
    if (!this.options.rules) return false
    if (!this.options.rules.el) return false
    if (!this.options.rules.el[el]) return false

    return this.options.rules.el[el].toString()
  }

  Instance.prototype.preprocessTextContent = function (text) {
    text = text || ''
    return text.trim()
  }

  Instance.prototype.removeQuoteFromDom = function (dom) {
    dom = dom || false
    if (dom) dom.remove('.bbCodeQuote')

    return dom
  }

  Instance.prototype.getContentBySelector = function (html, selectorRule, defaultReturn) {
    var defaultReturn = defaultReturn || ''
    var selector = selectorRule instanceof Rule ? selectorRule.toString() : selectorRule

    console.log('--> ', selector)

    if (!html) return defaultReturn
    if (!html.find(selector)) return defaultReturn

    // if (this.removeQuote) 
    html = this.removeQuoteFromDom(html)

    return this.preprocessTextContent(html.find(selector).text() || defaultReturn)
  }

  Instance.prototype.start = function () {
    this.instanceConfig = this.options

    console.log('Starting')

    var that = this
    this.instanceConfig.callback = function (error, result, $) {
      if (!result || !result.request) {
        return
      }

      var currentUrl = result.request.href || ''
      // =====================================================
      // Parse content
      var container = $(that.getContainerRules())
      if (container.length) {
        container.each(function (index, block) {
          var collectData = {
            parsedUrl: result.request.href,
            content: that.getContentBySelector($(block), that.getElRules('content'), 'nocontent')
          }

          console.log(collectData)
        })
      }
    }

    if (this.instanceConfig.urls.length == 0) {
      console.log('There are no URLs in queue!')
    }

    this.c = new Crawler(this.instanceConfig)
    for (var i = 0; i < this.instanceConfig.urls.length; i++) {
      console.log('Add link to queue: ', this.instanceConfig.urls[i])
      this.c.queue(this.instanceConfig.urls[i])
    }
  }

  module.exports = Instance
}).call(this)
