var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

//USAePay Source Key
var sha256 = require('sha256');

var seed = "abcdefghijklmnop";
var apikey = "_6cf4DgHCWFM3Y29vmk39M63aGA8yZ69";
//_V87Qtb513Cd3vabM7RC0TbtJWeSo8p7
var apipin = "123456";
var prehash = apikey + seed + apipin;
var apihash = 's2/'+ seed + '/' + sha256(prehash);
var authKey = new Buffer(apikey + ":" + apihash).toString('base64');
//console.log("Authorization: Basic " + authKey);
var keyedsalecommand = 'api/v2/transactions';
//var cors ='https://cors-anywhere.herokuapp.com/'
var url='https://sandbox.usaepay.com/';
var endpoint =url+keyedsalecommand;
//Basic Auth: u/pw : _V87Qtb513Cd3vabM7RC0TbtJWeSo8p7 / 123456
//using the test credentials from the API documentation https://help.usaepay.info/developer/rest-api/

var paymentResponse = {};
var testSaleData = 
    {
    "command": "cc:sale",
    "amount": "5.00",
    "amount_detail": {
        "tax": "1.00",
        "tip": "0.50"
    },
    "creditcard": {
        "cardholder": "Chichi Rodriguez",
        "number": "4000100011112224",
        "expiration": "0221",
        "cvc": "123",
        "avs_street": "1234 Main",
        "avs_zip": "12345"
    },
    "invoice": "12356"
    }

const makePayment = async (req) =>{
    //adding form data
  testSaleData.amount = req.body.amount;
  testSaleData.creditcard.number = req.body.cardNumber;
  testSaleData.creditcard.expiration = req.body.expirationDate;
  testSaleData.creditcard.cvc = req.body.cvc;
  // sending API data to USAePay
  const data= JSON.stringify(testSaleData);
  console.log('making payment with this data:');
  console.log(data);

  try{
    const response =  await fetch(endpoint, {
      method: 'POST',
      headers: {
        "Content-type": "application/json",
        "Authorization": "Basic " + authKey
      },
      body: data
    })
    if(response.ok){
      const jsonResponse = await response.json();
      paymentResponse = jsonResponse;
      
      console.log('response ok?');
      console.log(jsonResponse);
    }
  }
  catch(error){
    console.log(error);
  }
}
router.post('/', function(req, res, next) {
  makePayment(req)
  .then( ()=>{
    res.render('donations', paymentResponse);
    console.log('paymentResponse');
    console.log(paymentResponse);
  });
});

module.exports = router;

