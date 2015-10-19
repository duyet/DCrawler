'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DCrawler');

module.exports = mongoose;
