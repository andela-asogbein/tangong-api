'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
  username: {
    type: String,
    required: 'Enter valid username',
    index: {unique: true}
  },
  password: {
    type: String,
    required: 'Choose a password',
    select: false
  },
  email: {
    type: String,
    required: 'Enter email',
    index: {unique: true}
  }
}, {versionKey: false});

UserSchema.pre('save', function(next){
  var user = this;
  if(user.isModified){
    bcrypt.hash(user.password, null, null, function(err, hash){
      if(err){
        return next(err);
      }
      user.password = hash;
      next();
    });
  }
  else{
    return next();
  }
});

UserSchema.methods.comparePassword = function(password){
  var user = this;

  return bcrypt.compareSync(password, user.password);
};

mongoose.model('User', UserSchema);
