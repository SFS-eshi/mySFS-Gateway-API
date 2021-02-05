//paytrace bearer token
var express = require('express');
var router = express.Router();
//var queryString = require('querystring');

var oauth = require('../controller/oauth');

/* GET oauth token listing. */
router.get('/', function(req, res, next) {

	oauth.getToken(function (err, body){

		//get the access_token value 
		var token = JSON.parse(body);
		var access_token = token['access_token'];
		//console.log(res);
		
		//print the entire response body, and access_token from the body
		res.send('respond with an oauth token resource \n' + body +'\n' + access_token);
	})	
});


module.exports = router;

