/**
 * Created by leon on 11/6/17.
 * http://www.52jb.net/biancheng/8523.html
 */
var mysql = require('mysql');
var db = {};

db.query = function sqlback(sqllan, fn) {
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "25327468",
        database: "cs542_cars",
        multipleStatements: true
    });
        // user: "root",
        // password: "25327468",
        // database: "CS542"
    con.connect(function(err){
        if (err){
            console.log(err);
            setTimeout(handleError , 2000);
            //return;
        }else{
            console.log("==> connection to mysql ...");
        }
    });

    var sql = sqllan;
    if(!sql) return;

    con.query(sql,function(err,rows,fields){
        if(err){
            console.log(err);
            return;
        }
        console.log("++> " + sql);
        fn(rows);
    });


    con.end(function(err){
        if(err){
            console.log(err);
            return;
        }else{
            console.log("==> disconnection to mysql ... ");
        }
    });
}

module.exports = db;
