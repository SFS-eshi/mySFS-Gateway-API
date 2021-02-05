var express = require('express');
var router = express.Router();
var queryString = require('querystring');

var oauthRouter = require('./oauth');
var oauth = require('../controller/oauth');
var keyedsale = require('../controller/keyedsale');

/* GET oauth token listing. */
router.get('/', function(req, res, next) {

	res.send('payment sent!');

});


module.exports = router;
