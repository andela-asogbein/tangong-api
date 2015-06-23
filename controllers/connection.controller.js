'use strict';

var mongoose = require('mongoose');

require("../models/gig.model");
require("../models/user.model");
require("../models/connection.model");


var Gig = mongoose.model("Gig");
var User = mongoose.model("User");

var Connections = mongoose.model("Connection");

module.exports = {
  add: function(body) {
    var connection = new Connections(body);
    connection.save(function(err, connection) {
      if (err) {
        console.log(5, err)
        return err;
      }
      console.log("saved");

      return connection;
    });
  },
  addFromRoute: function(req,res) {
    var connection = new Connections(req.body);
    connection.save(function(err, connection) {
      if (err) {
        return err;
      }
      res.json(connection);
    });
  },
  getAll: function(req, res) {
    Connections.find({}, function(err, result) {
      if (err) {
        return res.json(err);
      }
      res.json(result);
    })
  },
  remove: function(req, res) {
    Connections.remove({
      _id: req.params.id
    }, function(err, result) {
      if (err) {
        return res.json(err);
      }
      res.json(result);
    })
  },
  getByUser: function(req, res) {
    Connections.find({
        $or: [{
          provider: req.params.id,
          requester: req.params.id
        }]
      })
      .populate("requester provider gig")
      .exec(function(err, result) {
        if (err) {
          return res.json(err);
        }
        res.json(result);
      })
  },
  getByConnection: function(req, res) {
    Connections.findOne({
        _id: req.params.id
      })
      .populate("requester provider gig")
      .exec(function(err, result) {
        if (err) {
          return res.json(err);
        }
        res.json(result);
      })
  }
};
