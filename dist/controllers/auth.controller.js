"use strict";

var mongoose = require('mongoose');
require("../models/user.model");
require("../models/gig.model");

var crypto = require('crypto');
var async = require('async');
var jwt = require('jsonwebtoken');
var superSecret = 'tangoforme';

var User = mongoose.model("User");

module.exports = {
    authenticateUser: function authenticateUser(req, res) {
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                message: 'Email and password required!'
            });
        }
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) {
                return res.status(400).json(err);
            }
            if (user) {
                if (user.comparePassword(req.body.password)) {
                    return res.status(200).json({
                        token: user.generateJWT(),
                        user: user.name
                    });
                } else {
                    return res.status(401).json({
                        message: 'Wrong password!'
                    });
                }
            } else {
                return res.status(401).json({
                    message: 'Email address not in our database'
                });
            }
        });
    },
    verifyToken: function verifyToken(req, res, next) {
        var token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, 'secretKey', function (err, user) {
                if (err) {
                    return res.json({
                        message: 'Token could not be authenticated'
                    });
                } else {
                    req.user = user;
                    next();
                }
            });
        } else {
            return res.status(403).json({
                message: 'Token not found'
            });
        }
    },
    isAdmin: function isAdmin(req, res, next) {
        User.findOne({
            email: req.user.email
        }, function (err, user) {
            if (err) {
                return res.json(err);
            }
            if (user) {
                if (user.role === 'admin') {
                    next();
                } else {
                    return res.json({
                        message: 'Permission denied'
                    });
                }
            } else {
                return res.json({
                    message: 'User not found'
                });
            }
        });
    },
    forgot: function forgot(req, res, next) {

        async.waterfall([function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        }, function (token, done) {
            User.findOne({
                email: req.body.email
            }, function (err, user) {
                if (!user) {
                    return res.json({
                        message: 'No user found'
                    });
                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                user.save(function (err) {
                    done(err, token, user);
                });
            });
        }, function (token, user, done) {
            var transporter = nodemailer.createTransport();
            var mailOptions = {
                to: user.email,
                from: 'Tango Nigeria ✔ <no-reply@tangong.com>',
                subject: 'Tango Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' + 'Please click on the following link, or paste this into your browser to complete the process:\n\n' + '\n\n' + 'http://andela-ssunday.github.io/tangong/#!/reset/password/' + token + '\n\n' + ' If you did not request this, please ignore this email and your password will remain unchanged.\n'
            };
            transporter.sendMail(mailOptions, function (err, res) {
                done(err, 'done');
                return res;
            });
        }], function (err) {
            if (err) return next(err);
            res.json({
                message: 'Message Sent!'
            });
        });
    },
    reset: function reset(req, res) {
        async.waterfall([function (done) {
            User.findOne({
                resetPasswordToken: req.params.token,
                resetPasswordExpires: {
                    $gt: Date.now()
                }
            }, function (err, user) {
                if (!user) {
                    return res.json({
                        'message': 'User does not exist'
                    });
                }

                user.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;

                user.save(function (err, result) {
                    if (err) {
                        return res.json(err);
                    }
                    console.log(result);
                    res.json(result);
                });
            });
        }], function (err) {
            if (err) return err;
            res.json({
                message: 'Password changed!'
            });
        });
    }
};
//# sourceMappingURL=auth.controller.js.map