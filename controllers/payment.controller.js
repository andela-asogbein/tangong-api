'use strict';

var mailer = require("./mailers.controller.js");

module.exports = {
  checkNotification: function(req, res) {
    console.log(1, req);
    console.log(2, res);
    console.log(3,"blablabla");
    // mailer.sendMail("stephen.sunday@andela.co","hello world");
  }
};
