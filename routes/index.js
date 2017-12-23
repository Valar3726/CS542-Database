var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express'});
    res.render("pages/signin", { title: 'Sign In'});
});

module.exports = router;
