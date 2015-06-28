'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
// var session = require('express-session');

// app.use(session({secret: 'session secret key', resave: true, saveUninitialized: true}));
// app.use(passport.initialize());
// app.use(passport.session());

var UserSchema = new Schema({
  username: {
    type: String,
    required: 'Enter valid username',
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: 'Choose a password',
    select: false
  },
  email: {
    type: String,
    required: 'Enter email',
    index: {
      unique: true
    }
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  versionKey: false
});

UserSchema.pre('save', function(next) {
  var user = this;
  if (user.isModified) {
    bcrypt.hash(user.password, null, null, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  } else {
    return next();
  }
});

UserSchema.methods.comparePassword = function(password) {
  var user = this;
  // return bcrypt.compareSync(password, user.password);
  return true;
};

// UserSchema.pre('save', function(next) {
//   var user = this;
//   var SALT_FACTOR = 5;

//   if (!user.isModified('password')) return next();

//   bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
//     if (err) return next(err);

//     bcrypt.hash(user.password, salt, null, function(err, hash) {
//       if (err) return next(err);
//       user.password = hash;
//       next();
//     });
//   });
// });

// UserSchema.methods.comparePassword = function(candidatePassword, cb){
//   bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
//     if(err) return cb(err);
//     cb(null, isMatch);
//   });
// };

mongoose.model('User', UserSchema);

// passport.use(new LocalStrategy(function(username, password, done){
//   User.findOne({ username: username}, function(err, user){
//     if(err) return done(err);
//     if(!user) return done(null, false, { message: 'Incomming username' });
//     user.comparePassword(password, function(err, isMatch){
//       if(isMatch){
//         return done(null, user);
//       }else{
//         return done(null, false, {message: 'Incorrect password.'});
//       }
//     });
//   });
// }));

// passport.serializeUser(function(user, done){
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done){
//   User.findById(id, function(err, user){
//     done(err, user);
//   });
// });
