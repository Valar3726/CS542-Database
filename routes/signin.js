var express = require('express');
var router = express.Router();
var mysql = require('../public/javascripts/db.js');

router.get('/', function(req, res, next) {

    title = "Sign In";
    error = req.session.error;

    res.render('pages/signin');
});


router.post('/check', function(req, res, next) {

    var pd = req.body.password;
    var uid = req.body.userid;


    if(pd == "")
    {
        req.session.error = 'password is empty';



        res.redirect('http://localhost:3000/signin');

    }
    else if(uid == "")
    {
        req.session.error = 'userid is empty';

        res.redirect('http://localhost:3000/signin');
    }
    else
    {
        var sqllan = "select PID,password from password where PID = '" + Number(uid) +"' and password = '" + Number(pd) +"'";

        mysql.query(sqllan,function(result) {

            if(result.length == 0)
            {

                req.session.error = 'password is incorrect';
                res.redirect('http://localhost:3000/signin');
                return;
            }
            var firstResult = result[0];
            if((firstResult.PID !== null) && (firstResult.password !== null))
            {
                console.log(firstResult.PID);
                if(firstResult.PID >= 1000)
                {

                    sqllan = "select CNAME from customer where CID = '"+ firstResult.PID +"'";
                    mysql.query(sqllan,function(result){

                        req.session.error = "";
                        req.session.user = result[0].CNAME;
                        res.redirect("http://localhost:3000/customer");
                    });

                }
                else if(firstResult.PID >=100 && firstResult.PID < 1000)
                {
                    sqllan = "select NAME from employee where EID = '"+ firstResult.PID +"'";
                    mysql.query(sqllan,function(result){
                        req.session.error = "";
                        req.session.user = result[0].NAME;
                        res.redirect('http://localhost:3000/sales');
                    });

                }
                else if(firstResult.PID < 100)
                {
                    sqllan = "select NAME from employee where EID = '"+ firstResult.PID +"'";
                    mysql.query(sqllan,function(result){
                        req.session.error = "";
                        req.session.user = result[0].NAME;
                        res.redirect('http://localhost:3000/manager');
                    });
                }
            }
            else
            {
                console.log("error");
                res.redirect('http://localhost:3000/signin');
            }
        })
    }




});

module.exports = router;