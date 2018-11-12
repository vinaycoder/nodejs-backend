var express     = require('express');
var con         = require('../config/database');
var functions   = require('../config/functions');
var async       =require('async');
var router      = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  //var con=req.con;  
  var locals = {};
  async.parallel(
    [
       function(callback)
       {
        con.query('select * from tbl_homepage_header where active=1',function(errors, homepageHeader){
          locals.homepageHeader = homepageHeader;
                callback();
        });
       },
       function(callback)
       {
        con.query('select * from tbl_services where active=1',function(errors, services){
          locals.services = services;
                callback();
        });
       }

    ],
      function(err, results)
      {        
             res.render('index', {
               title: 'Home',                     
               header:  locals.homepageHeader,    
               services:  locals.services    
               });      
             
      }
    
    );
 
});



router.get('/about', function(req, res){
  res.render('index', {
    title: 'index'
  });
});

router.get('/real', function(req, res){
//  io.emit("socketToMe", "users");
    res.render('real', {
    title: 'Real Time',
    data:'vinay'
  });
});

module.exports = router;

