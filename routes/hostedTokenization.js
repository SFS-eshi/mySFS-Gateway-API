var express = require('express');
var router = express.Router();
const path = require('path');


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  //res.sendFile(__dirname +'/blue-hosted-token.html');
  res.sendFile(path.join(__dirname, '..', 'public/mySFS_API/blue-hosted-token.html'));


});

module.exports = router;