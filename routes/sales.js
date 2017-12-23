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
        res.render('pages/sales', {
            title: "Query Cars Information by Sales",
            userType: req.session.user,
            cars: result
        });
    })
});

router.post('/list', function (req, res, next) {
    var sqllan = "select carid,companyname as company,model,year,price " +
        "from car, model,company " +
        "where car.modelid = model.modelid " +
        "and model.companyid = company.companyid ";

    var result = mysql.query(sqllan, function (result) {
        res.render('pages/salesList', {
            title: "Query Cars Information by Sales",
            userType: req.session.user,
            cars: result
        });
    })
});

router.get('/list', function (req, res, next) {
    var sqllan = "select carid,companyname as company,model,year,price " +
        "from car, model,company " +
        "where car.modelid = model.modelid " +
        "and model.companyid = company.companyid ";

    var result = mysql.query(sqllan, function (result) {
        res.render('pages/salesList', {
            title: "Query Cars Information by Sales",
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
        sqllan = sqllan + " and car.year > " + yearmin;
    }

    if (yearmax.length != 0) {
        sqllan = sqllan + " and car.year < " + yearmax;
    }

    if (pricemin.length != 0) {
        sqllan = sqllan + " and car.price > " + pricemin;
    }

    if (pricemax.length != 0) {
        sqllan = sqllan + " and car.price < " + pricemax;
    }

    var result = mysql.query(sqllan, function (result) {
        res.render('pages/sales', {
            title: "Query Cars Information by Sales",
            userType: req.session.user,
            cars: result
        });
    })
});

router.get('/detail/:id', function (req, res, next) {
    var id = req.params.id;

    var sqllan = "select carid,model.modelid as modelid,price,registration,engV, " +
        "engType,year,drive,status,company.companyname as companyname,company.country as country, model,body,summary, img, videolink " +
        "from car, model, company " +
        "where car.modelid = model.modelid " +
        "and model.companyid = company.companyid " +
        "and car.carid = '" + id + "'";

    var result = mysql.query(sqllan, function (result) {
        res.render('pages/salesCar', {
            title: "Query Cars Information by Sales",
            userType: req.session.user,
            car: result[0]
        });
    })
});

router.post('/new', function (req, res, next) {
    res.render('pages/salesNew', {
        title: "Input New Car Record",
        userType: req.session.user
    });
});

router.post('/newRecord', function (req, res, next) {
    var newCar = {
        carid: req.body.carid,
        price: req.body.price,
        mileage: req.body.mileage,
        year: req.body.year,
        engvolume: req.body.engv,
        engtype: req.body.engType,
        drive: req.body.drive,
        status: req.body.status,
        registration: req.body.registration,
        mileage:req.body.mileage,
        modelid: req.body.modelid
    }

    var sqlInsert = "insert into car(carid,modelid,price,registration,mileage,engV,engType,year,drive,status) values ('" +
        newCar.carid + "','" +
        newCar.modelid + "','" +
        newCar.price + "','" +
        newCar.registration + "','" +
        newCar.mileage + "','" +
        newCar.engvolume + "','" +
        newCar.engtype + "','" +
        newCar.year + "','" +
        newCar.drive + "','" +
        newCar.status
        + "');"

    var ex = mysql.query(sqlInsert, function () {
    })

    res.redirect('/sales/detail/' + newCar.carid);
});

router.get('/remove/:id', function (req, res, next) {
    var id = req.params.id;
    var sqlremove = "delete from car where carid = '" + id + "';"

    var ex = mysql.query(sqlremove, function () {})

    var sqllan = "select carid,companyname as company,model,year,price " +
        "from car, model,company " +
        "where car.modelid = model.modelid " +
        "and model.companyid = company.companyid ";

    var result = mysql.query(sqllan, function (result) {
        res.redirect('http://localhost:3000/sales');
    })
});

router.get('/modify/:id', function (req, res, next) {
    var id = req.params.id;
    console.log(req.session.user);

     sqllan = "select carid,model.modelid as modelid,price,price * (1-budget) as minimumprice, registration,engV, " +
        "engType,year,drive,status,company.companyname as companyname," +
        "company.country as country, mileage, model,body,summary, img, videolink " +
        "from car, model, company, employee " +
        "where car.modelid = model.modelid " +
        "and model.companyid = company.companyid " +
        "and employee.NAME = '"+req.session.user+"'" +
        "and car.carid = '" + id + "'";





    var result = mysql.query(sqllan, function (result) {
        res.render('pages/salesModify', {
            title: "Query Cars Information by Sales",
            userType: req.session.user,
            car: result[0]
        });
    })
});

router.post('/update', function (req, res, next) {
    var newCar = {
        carid: req.body.carid,
        price: req.body.price,
        minimumprice : req.body.minimumprice,
        mileage: req.body.mileage,
        year: req.body.year,
        engvolume: req.body.engV,
        engtype: req.body.engType,
        drive: req.body.drive,
        status: req.body.status,
        mileage: req.body.mileage,
        registration: req.body.registration,
        modelid: req.body.modelid
    }

        var sqlInsert = "update car set price = '" + newCar.price +
            "',registration = '" + newCar.registration +
            "',engV = '" + newCar.engvolume +
            "',engType = '" + newCar.engtype +
            "',mileage = '" + newCar.mileage +
            "',year = '" + newCar.year +
            "',drive = '" + newCar.drive +
            "',status = '" + newCar.status +"' where carid = '"+newCar.carid+"'";
        var ex = mysql.query(sqlInsert, function () {
        })

        res.redirect('/sales/detail/' + newCar.carid)



});


module.exports = router;
