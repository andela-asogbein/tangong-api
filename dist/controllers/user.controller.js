"use strict";

var mongoose = require('mongoose');
require("../models/user.model");
require("../models/gig.model");

var nodemailer = require('nodemailer');

var User = mongoose.model('User');
var Gig = mongoose.model("Gig");

var mailer = require("./mailer.controller.js");

var jwt = require('jsonwebtoken');
var superSecret = 'tangoforme';

module.exports = {
    getUserById: function getUserById(req, res, next) {
        User.findOne({
            username: req.params.username
        }, function (err, user) {
            if (err) {
                return res.json(err);
            }
            if (!user) {
                return res.json("User doesn't exist");
            }
            req.user_id = user._id;
            next();
        });
    },

    getUserByEmail: function getUserByEmail(req, res) {
        User.findOne({
            email: req.params.email
        }, function (err, user) {
            if (err) {
                return res.json(err);
            }
            if (!user) {
                return res.json("User doesn't exist");
            }
            res.status(200).json(user);
        });
    },

    addUser2: function addUser2(req, res) {
        User.create(req.body, function (err, user) {
            if (err) {
                if (err.code === 11000) {
                    res.json({
                        message: 'Username or Email already taken'
                    });
                } else {
                    res.json({
                        message: err.errors.email.message
                    });
                }
                res.json(err);
            }
            res.status(201).json(user.username);
        });
    },

    addUser: function addUser(req, res) {
        var user = new User(req.body);
        user.setPassword(req.body.password);
        user.save(function (err, user) {
            if (err) {
                return res.json(err);
            }
            mailer.sendMail(user.email, "Welcome to Tango Nigeria", "Hello, " + user.username + " Welcome to Tango Nigeria. Login here: http://andela-ssunday.github.io/tangong");
            res.status(201).json(user);
        });
    },

    getUsers: function getUsers(req, res) {
        User.find(function (err, users) {
            if (err) {
                return res.json(err);
            }
            res.status(200).json(users);
        });
    },

    getOneUser: function getOneUser(req, res) {
        User.findById({
            _id: req.params.user_id
        }, function (err, user) {
            if (err) {
                return res.json(err);
            }
            res.status(201).json(user);
        });
    },

    getByUsername: function getByUsername(req, res) {
        User.findOne({
            username: req.params.username
        }, function (err, user) {
            if (err) {
                return res.json(err);
            }
            res.status(201).json(user);
        });
    },

    updateUser: function updateUser(req, res) {

        User.findById(req.params.user_id, function (err, user) {
            if (err) {
                return res.json(err);
            }
            user.username = req.body.username;
            user.password = req.body.password;
            user.save(function (err, result) {
                if (err) {
                    return res.json(err);
                }
                var token = jwt.sign({
                    id: result._id,
                    username: result.username,
                    email: result.email
                }, superSecret, {
                    expiresInMinutes: 43200
                });
                res.status(201).json({
                    token: token
                });
            });
        });
    },

    deleteUser: function deleteUser(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function (err, user) {
            if (err) {
                return res.json(err);
            } else {
                Gig.remove({
                    addedBy: req.params.user_id
                }, function (err, gig) {
                    if (err) {
                        return res.json(err);
                    }
                    res.status(200).json(gig);
                });
            }
        });
    },

    deleteAllUsers: function deleteAllUsers(req, res) {
        User.remove({}, function (err, users) {
            if (err) {
                return res.json(err);
            }
            res.status(200).json(users);
        });
    }
};
//# sourceMappingURL=user.controller.js.map