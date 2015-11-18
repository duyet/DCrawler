'use strict';

var queue = require('../models/queue');

var url = queue.queue('http://tinhte.vn/thread/2', 'http://tinhte.vn/');

console.log(url);

