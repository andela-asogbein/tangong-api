'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');

// var cookieParser = require('cookie-parser');

// //for auth
// var nodemailer = require('nodemailer');

// var bcrypt = require('bcrypt-nodejs');
// var async = require('async');
// var crypto = require('crypto');

//mongodb connection
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/tango_db');

// app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization, x-access-token');
    next();
});

require('./routes/user.route')(app);
require('./routes/gig.route')(app);
require('./routes/category.route')(app);
require('./routes/payment.route')(app);
require('./routes/connection.route')(app);

module.exports = app;
