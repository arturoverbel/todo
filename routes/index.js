var express = require('express');
var router = express.Router();
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
    var data = fs.readFileSync(fileData);
    data = JSON.parse( data );

    res.render('index', { data: data });
});

module.exports = router;
