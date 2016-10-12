'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/tango_db');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, x-access-token');
    next();
});

require('./src/routes/user.route')(app);
require('./src/routes/gig.route')(app);
require('./src/routes/category.route')(app);
require('./src/routes/payment.route')(app);
require('./src/routes/connection.route')(app);

module.exports = app;
