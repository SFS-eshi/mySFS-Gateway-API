var express = require('express');
var router = express.Router();

var params = { 
	title: 'what',
	fname: 'asdf',
	lname: 'asdf'
};

router.post('/', function(req, res, next) {
    name = req.body;
    params.fname = name.fname;
    params.lname = name.lname;
    res.render('action', params);
});

module.exports = router;