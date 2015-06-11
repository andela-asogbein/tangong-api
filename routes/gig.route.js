'use strict';

var express = require('express');
var gigRouter = express.Router();

var gig = require('../controllers/gig.controller');
var user = require('../controllers/user.controller');

module.exports = function(app){
  gigRouter.route('/gigs/')
    .get(gig.getGigs)
    .post(user.verifyToken, gig.uploadImage, gig.addGig)
    .delete(user.verifyToken, gig.deleteAll);

  gigRouter.get('/gigs/search/gig', gig.searchGigs);
  gigRouter.get('/gigs/search/category', gig.searchGigs);

  gigRouter.route('/gig/:gig_id')
    .get(gig.getOneGig)
    .put(user.verifyToken, gig.updateGig)
    .delete(user.verifyToken, gig.deleteGig);

  app.use('/api', gigRouter);
};
