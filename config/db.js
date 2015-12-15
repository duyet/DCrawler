'use strict';

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DCrawlerTest');

module.exports = mongoose;
