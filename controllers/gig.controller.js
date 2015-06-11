'use strict';

var mongoose = require('mongoose');
var formidable = require('formidable');
var cloudinary = require('cloudinary');
var util = require('util');

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

var addImage = function(req,res){
  var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
    });
    form.on('end', function(fields, files) {
      var temp_path = this.openedFiles[0].path;
      var file_name = this.openedFiles[0].name;
      return temp_path;
    });
}
module.exports = {

  addImage: function(req,res,next){
    var form = new formidable.IncomingForm();
      form.parse(req, function(err, fields, files) {
        req.body = fields;

        req.image = files.file.path;
        console.log(req.image);
        cloudinary.uploader.upload(req.image, function(result) { 
          req.body.imageUrl = result.url;
          next();
        });
      });
  },
  addGig: function(req, res){
      req.body.addedBy = req.user.id;
      var gig = new Gig(req.body)
      gig.save(function(err, gig){
        if(err){
          console.log(err);
          return res.json(err);
        }
        console.log("done");
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
