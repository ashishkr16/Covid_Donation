var express = require('express');
var router = express.Router();
var paypal = require('paypal-rest-sdk');


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AfdVN-Xk0jDX7S7Ko9dczGJggrs-_-3FYnU9VRkm1OspjCZFnQUfa1hv4J5D06f6ezPVrcGIwhqqFmVx',
    'client_secret': 'EPVMj_0lUl0mZTiNxGe353L4PkA4c7ihzw-Rpn06Vu69gepIEeqW334btHVMSiBkmn3_ZUwshf_5U7Is'
  });

router.post('/', function (req, res) {
    var name = req.body.name
    var email = req.body.email
    var amount = req.body.amount
    console.log(name)
    console.log(email)
    console.log(amount)
    const create_payment_json = {
        "intent": "donation",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Covid Donation",
                    "sku": "Donation",
                    "price": amount,
                    "currency": "INR",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "INR",
                "total": amount
            },
            "description": "Covid-19 Donation"
        }]
    };
    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
        }
    });
});

module.exports = router;
