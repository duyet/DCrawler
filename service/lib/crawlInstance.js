'use strict'

;(function () {
  var path = require('path')
  var fs = require('fs')
  var url = require('url')

  var _ = require('lodash')
  var mongoose = require('mongoose')

  var Crawler = require('./crawler')
  var db = require('../config/db')

  var Rule = require('./rule')
  var DataRow = require('./datarow')

  var Instance = function (options) {
    var defaults = {
      skipDuplicates: true,
      removeSpace: true,
      removeNewLine: true,
      removeCommentQuote: true,

      source: '',
      category: 'device',
      product: '',
      model: 'RawData',
      urls: [],

      rules: {
        paging: [],
        container: [],
        el: {
          content: [],
          date: []
        }
      }
    }

    this.rootDir = path.join(__dirname, '../../')

    this.options = {}
    if (options.file && _.isString(options.file) && fs.existsSync(this.rootDir + options.file || '')) {
      this.options = require(this.rootDir + options.file)
    } else if (options.file && _.isString(options.file)) {
      throw Error('Config instance is not found: ' + this.rootDir + options.file)
    }

    this.options = _.merge(options, this.options || {})
    this.options = _.merge(defaults, this.options || {})

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

  Instance.prototype.getPagingSelector = function () {
    if (!this.options.rules) return false
    if (!this.options.rules.paging) return false

    return this.options.rules.paging.join(',')
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
    if (dom) {
      dom = dom.remove('.bbCodeQuote')
    }

    return dom
  }

  Instance.prototype.getContentBySelector = function (html, selectorRule, defaultReturn) {
    var defaultReturn = defaultReturn || ''
    var selector = selectorRule instanceof Rule ? selectorRule.toString() : selectorRule

    if (!html) return defaultReturn
    if (!html.find(selector)) return defaultReturn

    if (this.options.removeCommentQuote) {
      html = this.removeQuoteFromDom(html)
    }

    return this.preprocessTextContent(html.find(selector).text() || defaultReturn)
  }

  Instance.prototype.start = function () {
    this.instanceConfig = this.options

    console.log('Starting')

    var that = this
    this.instanceConfig.callback = function (error, result, $) {
      var queueThat = this

      if (!result || !result.request) {
        console.log('No result')
        return
      }

      var currentUrl = result.request.href || ''
      var parser = url.parse(currentUrl)

      // ====================================================
      // Paging
      var pagingWrap = $(that.getPagingSelector())
      if (pagingWrap) {
        var paging = $(pagingWrap).find('a')
        if (paging.length) {
          paging.each(function (index, a) {
            var nextPage
            if (a != null && (nextPage = $(a).attr('href')) != null) {
              parser.pathname = nextPage
              nextPage = url.format(parser)

              that.c.queue(nextPage)
            }
          })
        }
      }

      // =====================================================
      // Parse content
      var container = $(that.getContainerRules())
      if (container.length) {
        container.each(function (index, block) {
          var collectData = {
            url: result.request.href || '',
            source: that.instanceConfig.source,
            category: that.instanceConfig.category,
            product: that.instanceConfig.product,
            model: that.instanceConfig.model,
            datetime: that.getContentBySelector($(block), that.getElRules('date'), ''),
            crawlDate: new Date(),
            content: that.getContentBySelector($(block), that.getElRules('content'), ''),
            label: '', // default empty
          }

          if (that.instanceConfig.removeSpace) {
            collectData.content = collectData.content.replace(/\s+/g, ' ')
          }
          if (that.instanceConfig.removeNewLine) {
            collectData.content = collectData.content.replace(/\n/g, '. ')
          }

          if (that.instanceConfig.resultCallback && collectData.content.length) {
            that.instanceConfig.resultCallback(new DataRow(collectData))
          }
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
