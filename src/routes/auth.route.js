var express = require('express');
var router = express.Router();

var auth = require('../controllers/auth.controller');

module.exports = function(app){
    router.post('/forgot', auth.forgot);
    router.post('/authenticate', auth.authenticateUser);
    router.post('/reset/:token', auth.reset);

    app.use('/api', router);
}
