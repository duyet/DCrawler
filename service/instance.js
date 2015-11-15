'use strict'

var _ = require('lodash')
var args = require('optimist').argv

var Instance = require('./lib/crawlInstance')

if (args._ || args._.length == 1)
  var i = new Instance(args._[0])
else
  var i = new Instance(args)

console.log('Config: ', i.getConfig())
console.log('=======================================')
i.start()
