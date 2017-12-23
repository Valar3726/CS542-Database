var express = require('express');
var router = express.Router();
var mysql = require('../public/javascripts/db.js')

/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express'});
    var sqllan = "select carid,model,year,price,img,companyname as company " +
        "from car, model,company " +
        "where car.modelid = model.modelid " +
        "and model.companyid = company.companyid";



    var result = mysql.query(sqllan,function(result){
        res.render('pages/manager',{
            title:"Query Cars Information by manager",
            userType:req.session.user,
            cars:result});
    })
});

router.post('/query', function(req, res, next) {
    var company  = req.body.company;
    var yearmin  = req.body.yearmin;
    var yearmax  = req.body.yearmax;
    var pricemin = req.body.pricemin;
    var pricemax = req.body.pricemax;



    var sqllan = ""
    if (company != 'Company') {
        sqllan = "select carid,model,year,price,img, companyname as company " +
            "from car, model,company " +
            "where car.modelid = model.modelid " +
            "and model.companyid = company.companyid" +
            " and company.companyname = '" + company + "'";
    } else {
        sqllan = "select carid,model,year,price,img, companyname as company " +
            "from car, model,company " +
            "where car.modelid = model.modelid " +
            "and model.companyid = company.companyid";
    }

    if (yearmin.length != 0){
        sqllan = sqllan + " and car.year > " + yearmin;

    }

    if (yearmax.length != 0){
        sqllan = sqllan + " and car.year < " + yearmax;

    }

    if (pricemin.length != 0){
        sqllan = sqllan + " and car.price > " + pricemin;

    }

    if (pricemax.length != 0){
        sqllan = sqllan + " and car.price < " + pricemax;

    }


    var result = mysql.query(sqllan,function(result){
        res.render('pages/manager',{
            title:"Query Cars Information by manager",
            userType:req.session.user,
            cars:result});
    })
});

router.get('/:id', function(req, res, next) {
    var id = req.params.id;

    var sqllan = "select carid,model.modelid as modelid,price,registration,engV, " +
        "engType,year,drive,status,company.companyname as companyname,company.country as country, model,body,summary, img, videolink " +
        "from car, model, company " +
        "where car.modelid = model.modelid " +
        "and model.companyid = company.companyid " +
        "and car.carid = '" + id + "'";

    var result = mysql.query(sqllan, function (result) {

        res.render('pages/managerCar', {
            title: "Query Cars Information by customer",
            userType: req.session.user,
            car: result[0]
        });
    })

});

router.post('/modify', function(req, res, next) {

    var sqllan = "select * from employee where EID>=100";

    var result = mysql.query(sqllan,function(result){
        res.render('pages/managerList',{
            title:"Sales Information by manager",
            userType:req.session.user,
            sales:result});
    })
});

router.post('/modify/:id', function(req, res, next) {


    var id = req.params.id;
    req.session.salesid = id;
    sales_id = id;
    res.render('pages/managerModify',{
        title:"Modify Sales information",
        userType:req.session.user});
});

router.post('/modifybudget', function(req, res, next) {

    var id = req.session.salesid;

    var sqllan = "update employee set budget = '"+ req.body.BUDGET+"' where EID = '"+id+"'";
    mysql.query(sqllan,function(result){});

    sqllan = "select carid,companyid,model,year,price,img from car, model where car.modelid = model.modelid";

    var result = mysql.query(sqllan,function(result){
        res.redirect('http://localhost:3000/manager');
    })
});

module.exports = router;
