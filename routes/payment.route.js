'use strict';

var express = require('express');
var gigRouter = express.Router();

var gig = require('../controllers/gig.controller');
var payment = require('../controllers/payment.controller');

module.exports = function(app) {
  gigRouter.route('/payment/')
    .post(payment.checkNotification)
  app.use('/api', gigRouter);
};
