var express = require('express');
var router = express.Router();
var mysql = require('../public/javascripts/db.js')


router.get('/', function(req, res, next) {

    title = req.session.error;
    res.render("pages/signup");
});


router.post('/check', function(req, res, next) {
    //res.render(‘index’, { title: ‘Express’ });
    var user_id = req.body.userid;
    var un = req.body.name;
    var pd = req.body.password;
    var zip = req.body.zip;


    if(user_id == "")
    {

        req.session.error = 'userid is empty!';
        res.redirect('http://localhost:3000/signup');

    }
    else if(un == "")
    {

        req.session.error = 'name is empty!';
        res.redirect('http://localhost:3000/signup');
    }
    else if(pd == "")
    {

        req.session.error = 'password is empty!';
        res.redirect('http://localhost:3000/signup');
    }
    else if(zip == "")
    {

        req.session.error = 'zip is empty!';
        res.redirect('http://localhost:3000/signup');
    }
    else
    {
        var sqllan = "select PID from password where PID = '" + Number(user_id) +"'";

        var result = mysql.query(sqllan,function(result) {

            if(result.length == 0)
            {


                sqllan = "insert into password (PID, password) values ('"+ Number(user_id) +"', '"+Number(pd)+"')";
                mysql.query(sqllan,function(result){});

                sqllan = "insert into customer (CID,CNAME,ZIP) values('"+ Number(user_id) +"','"+ un +"','"+ zip +"')";
                mysql.query(sqllan,function(result){});

                






                req.session.error = 'signup is successful!';
                res.redirect('http://localhost:3000/signin');
                return;
            }
            else
            {
                req.session.error = 'userID is exist!';
                res.redirect('http://localhost:3000/signup');
            }
        })
    }




});

module.exports = router;
