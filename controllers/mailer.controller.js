'use strict';


var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport("SMTP");

module.exports = {
  sendMail: function(recipient, subject, message) {
    var mailOptions = {
      from: "Tango Nigeria ✔ <no-reply@tangong.com>",
      to: recipient,
      subject: subject,
      // text: "Hello world ✔",
      html: "<b>" + message + "</b>"
    }

    transporter.sendMail(mailOptions, function(error, response) {
      if (error) {
        console.log(error);
        return;
      }
    });
  }
};
