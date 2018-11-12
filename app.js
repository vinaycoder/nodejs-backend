var express 	   = require('express');
var path	       = require('path');
var favicon 	   = require('serve-favicon');
var logger 		   = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var stylus       = require('stylus');
var session      = require('express-session');
var flash        = require('express-flash-notification');
var moment       = require('moment');   // for the date format
global.moment=moment;
var getMessage=function(type,message)
{   
   var tt='<div class="alert alert-'+type+' fade in alert-dismissable"><a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>'+message+'</div>';
  return tt;
}
global.getMessage=getMessage;
const PATHINFO="/";
global.appRoot = path.resolve(__dirname)+PATHINFO;
global.IMAGEURL = appRoot+'public/data/images/';
global.root='http://localhost:3000/';

// global.flash=flash;

/**create connection**/
/*
var mysql        = require('mysql');

var con=mysql.createConnection({
	  host       : 'localhost',
      user     : 'root',
      password : '',
      database : 'shadhapna'
});
*/

//********  end here the sql  ************


/*********** start here use routes ***********/

var index = require('./routes/index');
var admin = require('./routes/admin/index');
var users = require('./routes/users');



var app = express();
// view engine setup
/********** use jade engine  **********/
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
/* end here for the jade engine*/

/*************** start here  html engine **************/
var cons = require('consolidate');
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


/********* use session in routes *********/
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 6000000 }
}));

app.use(function(req, res, next) {  
  req.flash=flash;    
  next();
});

/******** make your database connection on route ********/
/*
app.use(function(req, res, next) {	
	req.con=con;  	
	next();
});
*/
/********* use routes **********/
app.use('/', index);
app.use('/admin', admin);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
