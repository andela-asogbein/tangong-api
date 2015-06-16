'use strict';

//database
var mongoose = require('mongoose');
require("../models/user.model");
var User = mongoose.model('User');

//authentication
var jwt =require('jsonwebtoken');
var superSecret = 'tangoforme';


module.exports = {

  authenticateUser: function(req, res){
    User.findOne({
      username: req.body.username,
    }).select('username password email').exec(function(err, user){
      if(err){
        return res.json(err);
      }
      else if(!user){
        res.json({
          message: 'User not found'
        });
      }
      else{
        var validPassword = user.comparePassword(req.body.password);
        if(!validPassword){
          res.json({
            message: 'Wrong password'
          });
        }
        else{
          console.log("hello");
          var token = jwt.sign({
            id: user._id,
            username: user.username,
            email: user.email
          }, superSecret, {
              expiresInMinutes: 1440
          });//end var token
          res.json({
            success: true,
            message: 'Token Generated',
            token: token
          });
        }
      }
    });
  },

  verifyToken: function(req, res, next) {
    var token = req.headers['x-access-token'];

    //if there is a token, decode it
    if(token){
      jwt.verify(token, superSecret, function(err, user){
        if(err){
          return res.json({
            message: 'Token could not be authenticated'
          });
        }
        else{
          req.user = user;
          // res.json(user);
          next();
        }
      });
    }else{
      return res.status(403).json({
        message: 'Token not found'
      });
    }
  },
  getUserById:function(req,res,next){
    User.findOne({username: req.params.username}, function(err,user){
      if(err){
        return res.json(err);
      }
      if(!user){
        return res.json("User doesnt exist");
      }
      req.user_id = user._id;
      next();
    });
  },
  addUser2: function(req, res){
    User.create(req.body, function(err, user){
      if(err){
        if(err.code ===  11000){
          res.json({message: 'Username or Email already taken'});
        }
        else{
          res.json({message : err.errors.email.message});
        }
        res.json(err);
      }
      res.status(201).json(user.username);
    });
  },

    addUser: function(req, res){
      var user = new User(req.body);
      user.save(function(err, user){
        if(err){
          return res.json(err);
        }
        res.status(201).json(user);
      });
  },

  getUsers: function(req, res){
    User.find(function(err, users){
      if(err){
        return res.json(err);
      }
      res.status(200).json(users);
    });
  },

  getOneUser: function(req, res){
    User.findById({_id: req.params.user_id}, function(err, user){
      if(err){
        return res.json(err);
      }
      res.status(201).json(user);
    });
  },

   getByUsername: function(req, res){
    User.findOne({username: req.params.username}, function(err, user){
      if(err){
        return res.json(err);
      }
      res.status(201).json(user);
    });
  },

  updateUser: function(req, res){
    User.update({_id: req.params.user_id}, req.body, function(err, user){
      if(err){
        return res.json(err);
      }
      res.status(201).json(user);
    });
  },

  deleteUser: function(req, res){
    User.remove({_id: req.params.user_id}, function(err, user){
      if(err){
        return res.json(err);
      }
      res.status(200).json(user);
    });
  },

  deleteAllUsers: function(req, res){
    User.remove({}, function(err, users){
      if(err){
        return res.json(err);
      }
      res.status(200).json(users);
    });
  },
};
