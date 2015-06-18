'use strict';

var mongoose = require('mongoose');
var formidable = require('formidable');
var cloudinary = require('cloudinary');

require("../models/gig.model");
require("../models/user.model");

cloudinary.config({
  cloud_name: 'neddinn',
  api_key: '358555269189826',
  api_secret: 'jJZiRszXOelRPoIIYeIayKwzZic'
});

var Gig = mongoose.model("Gig");
var User = mongoose.model("User");

var userController = require("./user.controller");

module.exports = {
  addImage: function(req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      req.body = fields;
      if (!files.hasOwnProperty('file')) {
        next();
        return;
      }
      req.image = files.file.path;
      cloudinary.uploader.upload(req.image, function(result) {
        req.body.imageUrl = result.url;
        next();
      });
    });
  },
  addGig: function(req, res) {
    req.body.addedBy = req.user.id;
    var gig = new Gig(req.body);
    gig.save(function(err, gig) {
      if (err) {
        return res.json(err);
      }
      res.status(201).json(gig);
    });
  },

  getGigs: function(req, res) {
    Gig.find({}).populate('addedBy category').sort("-dateAdded").exec(function(err, gigs) {
      if (err) {
        return res.json(err);
      }
      res.status(200).json(gigs);
    });
  },

  getOneGig: function(req, res) {
    Gig.findById({
      _id: req.params.gig_id
    }).populate('addedBy category').exec(function(err, gig) {
      if (err) {
        return res.json(err);
      }
      res.status(200).json(gig);
    });
  },

  updateGig: function(req, res) {
    var loggedInUser = req.user.id;
    console.log(2, loggedInUser);
    // req.body.addedBy = req.body.addedBy._id;
    console.log(1, req.body.addedBy);
    if (req.body.addedBy !== loggedInUser) {
      console.log("i reach")
      return res.json({
        error: "Unauhorized"
      });
    }
    Gig.update({
      _id: req.body._id
    }, req.body, function(err, gig) {
      if (err) {
        console.log(err);
        return res.json(err);
      }
      res.status(201).json(gig);
    });
  },

  deleteGig: function(req, res) {
    Gig.remove({
      _id: req.params.gig_id
    }, function(err, gig) {
      if (err) {
        return res.json(err);
      }
      res.status(200).json(gig);
    });
  },
  deleteAll: function(req, res) {
    Gig.remove({}, function(err, gig) {
      if (err) {
        return res.json(err);
      }
      res.status(200).json(gig);
    });
  },

  searchGigs: function(req, res) {
    var titleExpression = new RegExp(req.query.title, 'ig');
    Gig.find({
      title: titleExpression
    }, function(err, gigs) {
      if (err) {
        return res.json(err);
      }
      res.status(200).json(gigs);
    });
  },

  searchCategories: function(req, res){
    Gig.find({category: req.params.category_id}).populate('addedBy category').exec(function(err, gigs){
      if(err){
        return res.json(err);
      }
      res.status(200).json(gigs);
    });
  },

  searchUsers: function(req, res){
    var user_id = req.user_id;
    Gig.find({
      addedBy: user_id
    }).populate('addedBy category').exec(function(err, gigs) {
      if (err) {
        return res.json(err);
      }
      res.status(200).json(gigs);
    });
  },

  uploadImage: function(req, res, next) {
    if (req.files.file) {
      var path = req.files.file.path;
      cloudinary.uploader.upload(path, function(response) {
        req.img = response.url;
        next();
      });
    } else {
      next();
    }
  }
};
