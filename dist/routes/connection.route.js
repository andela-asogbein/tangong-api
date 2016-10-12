'use strict';

var express = require('express');
var connRouter = express.Router();

// var gig = require('../controllers/gig.controller');
var connections = require('../controllers/connection.controller');

module.exports = function (app) {
  connRouter.route('/connections').get(connections.getAll).post(connections.addFromRoute);
  connRouter.route('/connection/user/:id').get(connections.getByUser);
  connRouter.route('/connection/:id').get(connections.getByConnection).delete(connections.remove);

  app.use('/api', connRouter);
};
//# sourceMappingURL=connection.route.js.map