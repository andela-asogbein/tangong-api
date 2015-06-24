'use strict';
var express = require('express');
var userRouter = express.Router();

//authentication
var jwt =require('jsonwebtoken');
var superSecret = 'tangowebapplication';

var user = require('../controllers/user.controller');

module.exports = function(app){

  userRouter.post('/authenticate', user.authenticateUser);

  userRouter.route('/users')
    .get(user.getUsers)
    .post(user.addUser)
    .delete(user.verifyToken, user.deleteAllUsers);

  userRouter.route('/user/:user_id')
    .get(user.getOneUser)
    .put(user.verifyToken, user.updateUser)
    .delete(user.verifyToken, user.deleteUser);

  userRouter.get('/me', user.verifyToken, function(req, res){
    res.send(req.user);
  });

  userRouter.get('/user/username/:username', user.getByUsername);
  userRouter.get('/user/email/:email', user.getUserByEmail);

  app.use('/api', userRouter);
};
