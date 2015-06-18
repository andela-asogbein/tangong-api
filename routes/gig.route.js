'use strict';

var express = require('express');
var gigRouter = express.Router();

var gig = require('../controllers/gig.controller');
var user = require('../controllers/user.controller');

module.exports = function(app){
  gigRouter.route('/gigs/')
    .get(gig.getGigs)
    .post(user.verifyToken,gig.addImage,gig.addGig)
    .delete(user.verifyToken, gig.deleteAll);

  gigRouter.get('/gigs/search/gig', gig.searchGigs);
  gigRouter.get('/gigs/search/category/:category_id', gig.searchCategories);
  gigRouter.get('/gigs/search/user/:username', user.getUserById, gig.searchUsers);

  gigRouter.route('/gig/:gig_id')
    .get(gig.getOneGig)
    .put(user.verifyToken, gig.updateGig)
    .delete(user.verifyToken, gig.deleteGig);
  app.use('/api', gigRouter);
};
