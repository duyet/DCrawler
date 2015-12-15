'use strict'

var fs = require('fs');

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
 // Get result object by data.toObject()
 console.log("==>", data.toObject());
 var dataLine = data.get('url') + "\t"
    + data.get('title') + "\t"
    + data.get('price') + "\t"
    + data.get('datetime') + "\t"
    + data.get('content') + "\n";

 fs.appendFile('tmp/muaban-net.txt', dataLine);
}

var i = new Instance(instance)

console.log('Config: ', i.getConfig())
i.start()
