'use strict';

var express = require('express');
var gigRouter = express.Router();

var gig = require('../controllers/gig.controller');
var auth = require('../controllers/auth.controller');
var user = require('../controllers/user.controller');


module.exports = function(app){
  gigRouter.route('/gigs/')
    .get(gig.getGigs)
    // .post(auth.verifyToken,gig.addImage,gig.addGig)
    .post(gig.addGig)
    .delete(auth.verifyToken, gig.deleteAll);

  gigRouter.get('/randomGigs', gig.getRandomGigs);

  gigRouter.get('/gigs/search/gig', gig.searchGigs);
  gigRouter.get('/gigs/search/category/:category_id', gig.searchCategories);
  gigRouter.get('/gigs/search/user/:username', user.getUserById, gig.searchUsers);

  gigRouter.route('/gig/:gig_id')
    .get(gig.getOneGig)
    .put(auth.verifyToken,gig.addImage,gig.updateGig)
    .delete(auth.verifyToken, gig.deleteGig);
  app.use('/api', gigRouter);
};
