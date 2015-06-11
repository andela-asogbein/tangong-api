'use strict';

var mongoose = require('mongoose');

var formidable = require('formidable');
var util = require('util');
var fs = require('fs-extra');
var qt = require('quickthumb');
var multer = require('multer');
var cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: 'tangong',
  api_key: '522545772253275',
  api_secret: 'TqyViZd13MJkMYwAVKHRHweZhv0'
});


require("../models/gig.model");
require("../models/user.model");

var Gig = mongoose.model("Gig");
var User = mongoose.model("User");

var userController = require("./user.controller");

module.exports = {
  addGig: function(req, res){
    req.body.addedBy = req.user.id;
    req.body.imageUrl = req.img;
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
  },

  uploadImage: function(req, res, next){
    if(req.files.file){
      var path = req.files.file.path;
      cloudinary.uploader.upload(path, function(response){
        req.img = response.url;
        next();
      });
    }
    else{
      next();
    }
  }
};
