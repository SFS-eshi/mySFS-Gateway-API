var express = require('express');
var router = express.Router();
//const axios = require('axios');
var fetch = require('node-fetch');

const endpoint = 'https://api.sandbox.mysfsgateway.com/v2/transactions/charge';

var paymentResponse = {};

const makePayment = async (req) =>{
    //adding form data
    const { amount, name, result } = req.body;
    jsonResult = JSON.parse(result);
    numberAmount = Number(amount);
    
    const testSaleData = {
        'source': `nonce-${jsonResult.nonce}`,
        'amount': numberAmount,
        name,
        'expiry_month': jsonResult.expiryMonth,
        'expiry_year': jsonResult.expiryYear,
        'avs_zip': jsonResult.avsZip,
      };
      console.log(`result: ${result}`);

  // sending API data 
  const data= JSON.stringify(testSaleData);
  console.log('making payment with this data:');
  console.log(data);

  try{
    const response =  await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Basic UFd3MFdpQU5NSE85OTNtSFJIV0c3MHlhdWNQTUxuRlQ6MTIzNDU2'
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

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  makePayment(req)
  .then( ()=>{
    //res.send(paymentResponse);
    res.render('blue', paymentResponse);
  });
});

module.exports = router;