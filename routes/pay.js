var express = require('express');
var router = express.Router();
var Insta = require('instamojo-nodejs');


var API_KEY = "test_83aeb68996ffb5e97597cfc82a1";
var AUTH_KEY = "test_57273334bb95632d617adc845b3";

Insta.setKeys(API_KEY, AUTH_KEY);
Insta.isSandboxMode(true);

/* GET payment page. */
router.post('/', function (req, res, next) {
    var name = req.body.name
    var email = req.body.email
    var amount = req.body.amount
    console.log(name)
    console.log(email)
    console.log(amount)

    var data = new Insta.PaymentData();

    const REDIRECT_URL = "http://localhost:3000/success";

    data.setRedirectUrl(REDIRECT_URL);
    data.send_email = "True";
    data.purpose = "Donation"; // REQUIRED
    data.amount = amount;
    data.name = name;
    data.email = email;

    Insta.createPayment(data, function (error, response) {
        if (error) {
          // some error
        } else {
          // Payment redirection link at response.payment_request.longurl
        
          var pay_url= JSON.parse(response);
          res.redirect(pay_url.payment_request.longurl);
        }
    });
});

module.exports = router;
