'use strict';

var mailer = require("./mailer.controller.js");
var request = require("request");
var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport();
var connectionController = require("./connection.controller")

/* function that checks returned merchant_ref
 and gets the appropriate information. Assumes
 the string contains provider, gig,rquester,username,service respectively seperated by a - */
var checkRequest = function(str) {
  console.log(str);
  var info = str.split("-");
  return {
    'provider': info[0],
    'gig': info[1],
    'requester': info[2],
    'username': info[3],
    'service': info[4],
    'provider_username': info[5],
    'provider_email': info[6]
  }
}

module.exports = {
  checkNotification: function(req, res) {

    var transaction_id = req.body.transaction_id;
    request("https://voguepay.com/?v_transaction_id=" + transaction_id + "&type=json", function(err, response, body) {
      var body = JSON.parse(body);
      var info = checkRequest(body.merchant_ref);
      var provider_username = info.provider_username;
      var service = info.service;
      var provider_email = info.provider_email;
      info.transaction_id = transaction_id;
      if (body.status && body.status === "Approved") {
        // mailer.sendMail(provider_email, "Tango Nigeria", "Hello, " + provider_username + " Someone has paid for your service " + service + " on Tango").then(function(data) {
        //     console.log(1, data)
        //     console.log("hiiii");
        //     connectionController.add(info).then(function(data) {
        //       console.log(2, data)
        //     })
        //   })
        var message = "Hello, " + provider_username + " Someone has paid for your service " + service + " on Tango";
        var mailOptions = {
          from: "Tango Nigeria ✔ <no-reply@tangong.com>",
          to: provider_email,
          subject: "Tango Nigeria",
          html: "<b>" + message + "</b>"
        }
        transporter.sendMail(mailOptions, function(error, response) {
          if (error) {
            console.log(error);
          }
          connectionController.add(info)
          setTimeout(res.redirect(body.referrer + "#!/gig/" + info.gig), 9000);
        })
      }
    });
  }
}
