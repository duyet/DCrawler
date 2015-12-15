'use strict'

var _ = require('lodash')

module.exports = function (selector, type) {
  this.selector = selector || []
  if (!_.isArray(this.selector)) this.selector = [this.selector]

  this.type = type || 'text'
  this.toString = function () {
    return this.selector.join(',')
  }
}
