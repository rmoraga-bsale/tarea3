var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('request/index', {script: '/build/request.js'});
});

module.exports = router;
