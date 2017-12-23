/**
 * Created by lzhang6 on 11/18/17.
 */
var express = require('express');
var router = express.Router();
var mysql = require('../public/javascripts/db.js')

/* GET home page. */
router.get('/', function (req, res, next) {

    var sqllan = "select carid,model,year,price,img,companyname as company " +
        "from car, model,company " +
        "where car.modelid = model.modelid " +
        "and model.companyid = company.companyid";

    var result = mysql.query(sqllan, function (result) {
        res.render('pages/customer', {
            title: "Query Cars Information by customer",
            userType: req.session.user,
            cars: result
        });
    })
});

router.post('/query', function (req, res, next) {
    var company = req.body.company;

    var yearmin = req.body.yearmin;
    var yearmax = req.body.yearmax;
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

    if (yearmin.length != 0) {
        sqllan = sqllan + " and car.year >= " + yearmin;
    }

    if (yearmax.length != 0) {
        sqllan = sqllan + " and car.year <= " + yearmax;
    }

    if (pricemin.length != 0) {
        sqllan = sqllan + " and car.price >= " + pricemin;
    }

    if (pricemax.length != 0) {
        sqllan = sqllan + " and car.price <= " + pricemax;
    }

    var result = mysql.query(sqllan, function (result) {
        res.render('pages/customer', {
            title: "Query Cars Information by customer",
            userType: req.session.user,
            cars: result
        });
    })
});

router.get('/:id', function (req, res, next) {
    var id = req.params.id;

    var sqllan = "select carid,model.modelid as modelid,price,registration,engV, " +
        "engType,year,drive,status,company.companyname as companyname,company.country as country, model,body,summary, img, videolink " +
        "from car, model, company " +
        "where car.modelid = model.modelid " +
        "and model.companyid = company.companyid " +
        "and car.carid = '" + id + "'";

    var result = mysql.query(sqllan, function (result) {

        res.render('pages/customerCar', {
            title: "Query Cars Information by customer",
            userType: req.session.user,
            car: result[0]
        });
    })
});

module.exports = router;
