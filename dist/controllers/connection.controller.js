'use strict';

var mongoose = require('mongoose');

require("../models/gig.model");
require("../models/user.model");
require("../models/connection.model");

var Gig = mongoose.model("Gig");
var User = mongoose.model("User");

var Connections = mongoose.model("Connection");

module.exports = {
  add: function add(body) {
    var connection = new Connections(body);
    connection.save(function (err, connection) {
      if (err) {
        console.log(5, err);
        return err;
      }
      console.log("saved");

      return connection;
    });
  },
  addFromRoute: function addFromRoute(req, res) {
    var connection = new Connections(req.body);
    connection.save(function (err, connection) {
      if (err) {
        return err;
      }
      res.json(connection);
    });
  },
  getAll: function getAll(req, res) {
    Connections.find({}).populate("requester provider gig").exec(function (err, result) {
      if (err) {
        return res.json(err);
      }
      res.json(result);
    });
  },
  remove: function remove(req, res) {
    Connections.remove({
      _id: req.params.id
    }, function (err, result) {
      if (err) {
        return res.json(err);
      }
      res.json(result);
    });
  },
  getByUser: function getByUser(req, res) {
    Connections.find({ $or: [{ requester: req.params.id }, { provider: req.params.id }] }).populate("requester provider gig").exec(function (err, result) {
      if (err) {
        return res.json(err);
      }
      res.json(result);
    });
  },
  getByConnection: function getByConnection(req, res) {
    Connections.findOne({
      _id: req.params.id
    }).populate("requester provider gig").exec(function (err, result) {
      if (err) {
        return res.json(err);
      }
      res.json(result);
    });
  }
};
//# sourceMappingURL=connection.controller.js.map