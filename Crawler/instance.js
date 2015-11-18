'use strict'

var _ = require('lodash')
var args = require('optimist').argv
var unirest = require('unirest')

var Instance = require('./lib/crawlInstance')

var config = {
  strongloop: 'http://localhost:3000/api'
}

var instance = {}
if (args._ || args._.length == 1)
  instance.file = args._[0]
else
  instance = args

instance.resultCallback = function (data) {
  if (data) {
    unirest
      .put(config.strongloop + '/' + data.get('model'))
      .header('Accept', 'application/json')
      .send(data.toJson())
      .end(function (response) {
        console.log(response.body)
      })
  }
}

var i = new Instance(instance)

console.log('Config: ', i.getConfig())
i.start()
