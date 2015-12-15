'use strict'

var _ = require('lodash')
var args = require('optimist').argv
var unirest = require('unirest')

var Instance = require('./lib/crawlInstance')

var instance = {}
if (args._ || args._.length == 1)
  instance.file = args._[0]
else
  instance = args

instance.resultCallback = function (data) {
 console.log("==>", data.toObject());
}

var i = new Instance(instance)

console.log('Config: ', i.getConfig())
i.start()
