var express = require('express');
var router = express.Router();

var user = require('../controllers/user.controller');
var auth = require('../controllers/auth.controller');

module.exports = function(app) {

    router.route('/users')
        .get(user.getUsers)
        .post(user.addUser)
        .delete(user.deleteAllUsers);

    router.route('/user/:user_id')
        .get(user.getOneUser)
        .put(auth.verifyToken, user.updateUser)
        .delete(auth.verifyToken, user.deleteUser);

    router.get('/me', auth.verifyToken, function(req, res) {
        res.send(req.user);
    });

    router.get('/user/username/:username', user.getByUsername);
    router.get('/user/email/:email', user.getUserByEmail);


    app.use('/api', router);
};
