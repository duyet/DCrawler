'use strict'

var _ = require('lodash')

module.exports = function (raw) {
  this.data = raw || {}

  this.toJson = function () {
    return this.toObject()
  }

  this.toObject = function () {
    return this.data
  }

  this.toString = function () {
    return JSON.stringify(this.data)
  }

  this.get = function (key) {
    if (this.data && this.data.hasOwnProperty(key))
      return this.data[key]

    return null
  }

  this.set = function (key, value) {
    this.data[key] = value
  }

  return this
}
