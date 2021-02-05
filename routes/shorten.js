var express = require('express');
var router = express.Router();
var fetch = require('node-fetch');

var urlInput = { 
	url: 'https://www.yahoo.com/',
	urlShort: ''
};


// information to reach Rebrandly API
const apiKey = '77106d0fa7854371bc66bc0dfb2dab05';
const rebrandlyEndpoint = 'https://api.rebrandly.com/v1/links';

// AJAX functions
const shortenUrl = async (request) =>{
	urlInput.url = request.body.url;
  const data = JSON.stringify({destination: urlInput.url});
  try{
    const response =  await fetch(rebrandlyEndpoint, {
      method: 'POST',
      body: data,
      headers: {
        "Content-type": "application/json",
        'apikey': apiKey
      }
    })
    if(response.ok){
      const jsonResponse = await response.json();
			//renderByteResponse(jsonResponse);
			urlInput.urlShort = jsonResponse.shortUrl;
			console.log(urlInput.urlShort);
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
	shortenUrl(req)
	.then(()=>{
		res.send(urlInput); 
	});
	   
});

module.exports = router;
