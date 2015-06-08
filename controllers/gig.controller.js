'use strict';

var mongoose = require('mongoose');

require("../models/gig.model");
require("../models/user.model");

var Gig = mongoose.model("Gig");
var User = mongoose.model("User");

module.exports = {

  addGig: function(req, res){
    console.log(req.body);
    var gig = new Gig(req.body);
    gig.save(function(err, gig){
      if(err){
        return res.json(err);
      }
      res.status(201).json(gig);
    });
  },

  getGigs: function(req, res){
    Gig.find({}).populate('addedBy category').exec(function(err, gigs){
      if(err){
        return res.json(err);
      }
      res.status(200).json(gigs);
    });
  },

  getOneGig: function(req, res){
    Gig.findById({_id: req.params.gig_id}, function(err, gig){
      if(err){
        return res.json(err);
      }
      res.status(200).json(gig);
    });
  },

  updateGig: function(req, res){
    Gig.update({_id: req.params.gig_id}, req.body, function(err, gig){
      if(err){
        return res.json(err);
      }
      res.status(201).json(gig);
    });
  },

  deleteGig: function(req, res){
    Gig.remove({_id: req.params.gig_id}, function(err, gig){
      if(err){
        return res.json(err);
      }
      res.status(200).json(gig);
    });
  },
  deleteAll: function(req, res){
    Gig.remove({}, function(err, gig){
      if(err){
        return res.json(err);
      }
      res.status(200).json(gig);
    });
  },

  searchGigs: function(req, res){
    var titleExpression = new RegExp(req.query.title, 'ig');
    Gig.find({title: titleExpression}, function(err, gigs){
      if(err){
        return res.json(err);
      }
      res.status(200).json(gigs);
    });
  },

  searchCategories: function(req, res){
    var categoryExpression = new RegExp(req.query.category, 'ig');
    Gig.find({category: categoryExpression}, function(err, gigs){
      if(err){
        return res.json(err);
      }
      res.status(200).json(gigs);
    });
  }
};
