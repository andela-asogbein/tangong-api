'use strict';

var express = require('express');
var payRouter = express.Router();

// var gig = require('../controllers/gig.controller');
var payment = require('../controllers/payment.controller');

module.exports = function (app) {
  payRouter.route('/payment').post(payment.checkNotification);
  app.use('/api', payRouter);
};
//# sourceMappingURL=payment.route.js.map