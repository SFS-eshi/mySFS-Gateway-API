var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.sendFile(__dirname +'/donations-jquery.html');

});


module.exports = router;
