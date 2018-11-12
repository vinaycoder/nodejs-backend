var express     = require('express');
var con         = require('../../config/database');
var login       = require('../../config/admin/login');
var functions   = require('../../config/admin/functions');
var async       = require('async');
var formidable  = require('formidable');
var router      = express.Router();
var fs          = require('fs');
global.con=con;
global.express=express;
global.async=async;
  // this function is used for login
var Jimp = require("jimp");
router.all('/upload', function(req, res){
Jimp.read(IMAGEURL+"1.jpg", function (err, lenna) {   
    lenna.resize(450, Jimp.AUTO)            // resize 
    ///lenna.resize(256, 256)            // resize 
         .quality(100)                 // set JPEG quality 
        // .greyscale()                 // set greyscale 
         .write(IMAGEURL+"test2.jpg"); // save 
});
return false;
	});
router.all('/', function(req, res){
	
	if(req.method=='POST' || req.method=='post')
	{
		if(req.body.username!='' && req.body.password!='')
		{			
			login.login(req, res);
		}
		else
		{
			   res.render('admin/index', {
               title: 'Login',
               flashMessage: getMessage('danger','Please enter User name and password.')
               });
		}
		
	}
	else
	{
		login.checkSession(req, res);
	}
	
});

router.get('/dashboard', function(req, res){
	
	   login.checkProfile(req, res);
  	   res.render('admin/dashboard', {
       title: 'dashboard',
       admin:req.session.admin
      });
	
	
});
router.get('/logout', function(req, res){
       delete req.session.admin;
       res.redirect('/admin');	
});
router.all('/profile', function(req,res){
    login.checkProfile(req, res);
	if(req.method=='post' || req.method=='POST')
	{
	  var form = new formidable.IncomingForm();
	    form.parse(req, function (err, fields, files) 
	    {
			// var modified_date      =moment().format('YYYY-MM-DD');        
			 var imagename=functions.upload(files);				
			if(imagename=='')
			{
				var imagename=fields.old_image;
				var sql='update tbl_admin set name="'+fields.name+'",last_name="'+fields.last_name+'",email="'+fields.email+'" where id='+fields.id+'';
			}
			else
			{
				var sql='update tbl_admin set name="'+fields.name+'",last_name="'+fields.last_name+'",email="'+fields.email+'",image="'+imagename+'" where id='+fields.id+'';
			}	       
	      console.log(sql);
			con.query(sql, function(errors,rows){
				console.log(rows);
				if(!errors)
				{
					 var admin = 
				              {
				               "name":fields.name,				               
				               "last_name":fields.last_name,				               
				               "email":fields.email,				               
				               "image":imagename				               
				              }; 
				             adminProfile=admin;
                             req.session.admin = admin;                   
				}
				
	 		 
	       });

	    });
		res.redirect('/admin/profile'+'?status=update');

	}
	var sql = 'select * from tbl_admin where username = ' + mysql.escape(req.session.admin.username);			
         con.query(sql,function(errors, rows){         
        	res.render('admin/admin-profile',{
		    title:'Admin profile',
		    ProfileData:rows
	     });
          
        });
	
});

/*** start here for the homepage title ***/
router.all('/add-homepage-text', function(req, res){
	login.checkProfile(req, res);
	if(req.method=='POST' || req.method=='post')
	{	
		var form = new formidable.IncomingForm();
	    form.parse(req, function (err, fields, files) 
	    {
			 var curdate      =moment().format('YYYY-MM-DD');        
			 var imagename=functions.upload(files);	
			 var sql = "INSERT INTO tbl_homepage_header (header, sub_header,image,link,created_date) VALUES ('"+fields.header+"','"+fields.sub_header+"','"+imagename+"','"+fields.link+"','"+curdate+"')";	
			con.query(sql, function (err, result) 
			{	


			});	
			res.redirect('/admin/view-homepage-text'+'?status=addd');
	    });

	}
	else
	{
	  res.render('admin/add-homepage-text', {
       title: 'Homepage text'
      });
	}
	 	
});

/** routing for view homepage text **/
router.all('/view-homepage-text',function(req, res){
	login.checkProfile(req, res);
	 if(req.method=='GET' && req.query.type=='del' && req.query.id!='')
	 {
	 	con.query('delete from tbl_homepage_header where id='+req.query.id+'', function(errors,rows){
	 		res.redirect('/admin/view-homepage-text'+'?status=del');
	 	});
	 }
	if(req.method=='GET' && req.query.type=='act' && req.query.id!='')
	 {
	 	con.query('update tbl_homepage_header set active=1 where id='+req.query.id+'', function(errors,rows){
	 		res.redirect('/admin/view-homepage-text'+'?status=act');
	 	});
	 }
	if(req.method=='GET' && req.query.type=='dact' && req.query.id!='')
	 {
	 	con.query('update tbl_homepage_header set active=0 where id='+req.query.id+'', function(errors,rows){
	 		res.redirect('/admin/view-homepage-text'+'?status=dact');
	 	});
	 }
	 var flashMessage='';
	 if(req.query.status=='addd')
	 {
	    flashMessage=getMessage('success','Record successfully saved');
	 }
	 if(req.query.status=='act')
	 {
	    flashMessage=getMessage('success','Record successfully activated');
	 }
	 if(req.query.status=='dact')
	 {
	    flashMessage=getMessage('success','Record successfully Deactivated');
	 }
	 if(req.query.status=='del')
	 {
	    flashMessage=getMessage('success','Record successfully Deleted');
	 }
	 if(req.query.status=='update')
	 {
	    flashMessage=getMessage('success','Record successfully Updated');
	 }
	con.query('select * from tbl_homepage_header order by id desc',function(err,rows){			
		   res.render('admin/view-homepage-text', {
	       title: 'view-homepage-text',
	       data:rows,
	       flashMessage:flashMessage
	      });		
	});
	 
});
/** routing for view homepage text **/
router.all('/edit-homepage-text',function(req, res){
login.checkProfile(req, res);
	if(req.method=='post' || req.method=='POST')
	{
	  var form = new formidable.IncomingForm();
	    form.parse(req, function (err, fields, files) 
	    {
			 var modified_date      =moment().format('YYYY-MM-DD');        
			 var imagename=functions.upload(files);				
			if(imagename=='')
			{
				var sql='update tbl_homepage_header set header="'+fields.header+'",sub_header="'+fields.sub_header+'",link="'+fields.link+'",modified_date="'+modified_date+'" where id='+fields.id+'';
			}
			else
			{
				var sql='update tbl_homepage_header set header="'+fields.header+'",sub_header="'+fields.sub_header+'",link="'+fields.link+'",modified_date="'+modified_date+'",image="'+imagename+'" where id='+fields.id+'';
			}	       
	      
			con.query(sql, function(errors,rows){
	 		
	       });

	    });

		res.redirect('/admin/view-homepage-text'+'?status=update');

	}
	con.query('select * from tbl_homepage_header where id='+req.query.id+'',function(err,rows){	
	 res.render('admin/edit-homepage-text', {
	       title: 'Edit-homepage-text',
	       data:rows	      
	      });

	});
});

/*** start here for the Portfolio ***/
router.all('/add-portfolio', function(req, res){
	login.checkProfile(req, res);
	if(req.method=='POST' || req.method=='post')
	{
		var form = new formidable.IncomingForm();
	    form.parse(req, function (err, fields, files) 
	    {
	    	 var locals = [];	    
			 var curdate      =moment().format('YYYY-MM-DD');  
			 /*********** start here to upload image **********/

			 var oldpath = files.image_big.path; 
			 var img_name=Date.now()+"_" + files.image_big.name;       
		     var newpath = IMAGEURL+ img_name;	    
		     var big_image1='';
		     if(files.image_big.name!='')
		     {
		     	fs.rename(oldpath, newpath);
		     	big_image1=img_name;
		     /******** resize image *******/		     	
		     	Jimp.read(IMAGEURL+big_image1, function (err, lenna) {   
			     lenna.resize(450, Jimp.AUTO)		    
			         .quality(100)		                      
			         .write(THUMBIMAGE+big_image1); 
			    });
		     }
  
			 /**************** end here upload ****************/			
			 
			 var sql = "INSERT INTO tbl_portfolio (name,link,big_image,description,created_date) VALUES ('"+fields.name+"','"+fields.link+"','"+big_image1+"','"+fields.description+"','"+curdate+"')";	
			con.query(sql, function (err, result) 
			{	


			});	
			res.redirect('/admin/view-portfolio'+'?status=addd');
	    });

	}
	else
	{
	  res.render('admin/add-portfolio', {
       title: 'Add Portfolio'
      });
	}
	 	
});

/** routing for view portfolio **/
router.all('/view-portfolio',function(req, res){
	login.checkProfile(req, res);
	 if(req.method=='GET' && req.query.type=='del' && req.query.id!='')
	 {
	 	con.query('delete from tbl_portfolio where id='+req.query.id+'', function(errors,rows){
	 		res.redirect('/admin/view-portfolio'+'?status=del');
	 	});
	 }
	if(req.method=='GET' && req.query.type=='act' && req.query.id!='')
	 {
	 	con.query('update tbl_portfolio set active=1 where id='+req.query.id+'', function(errors,rows){
	 		res.redirect('/admin/view-portfolio'+'?status=act');
	 	});
	 }
	if(req.method=='GET' && req.query.type=='dact' && req.query.id!='')
	 {
	 	con.query('update tbl_portfolio set active=0 where id='+req.query.id+'', function(errors,rows){
	 		res.redirect('/admin/view-portfolio'+'?status=dact');
	 	});
	 }
	 var flashMessage='';
	 if(req.query.status=='addd')
	 {
	    flashMessage=getMessage('success','Record successfully saved');
	 }
	 if(req.query.status=='act')
	 {
	    flashMessage=getMessage('success','Record successfully activated');
	 }
	 if(req.query.status=='dact')
	 {
	    flashMessage=getMessage('success','Record successfully Deactivated');
	 }
	 if(req.query.status=='del')
	 {
	    flashMessage=getMessage('success','Record successfully Deleted');
	 }
	 if(req.query.status=='update')
	 {
	    flashMessage=getMessage('success','Record successfully Updated');
	 }
	con.query('select * from tbl_portfolio order by id desc',function(err,rows){			
		   res.render('admin/view-portfolio', {
	       title: 'view portfolio',
	       data:rows,
	       flashMessage:flashMessage
	      });		
	});	 
});
/** routing for view homepage text **/
router.all('/edit-portfolio',function(req, res){
login.checkProfile(req, res);
	if(req.method=='post' || req.method=='POST')
	{

	  var form = new formidable.IncomingForm();
	    form.parse(req, function (err, fields, files) 
	    {
			 var modified_date      =moment().format('YYYY-MM-DD');        
			 /*********** upload file  **********/			 
		     var big_image1=fields.old_image_big;
		    if(files.image_big.name!='')
		     {
			     var oldpath = files.image_big.path; 
				 var img_name=Date.now()+"_" + files.image_big.name;       
			     var newpath = IMAGEURL+ img_name; 
		     	 fs.rename(oldpath, newpath);
		     	 big_image1=img_name;
		     	/******** resize image *******/		     	
		     	Jimp.read(IMAGEURL+big_image1, function (err, lenna) {   
			     lenna.resize(450, Jimp.AUTO)		    
			         .quality(100)		                      
			         .write(THUMBIMAGE+big_image1); 
			    });
			    fs.unlink(THUMBIMAGE+fields.old_image_big);
			    fs.unlink(IMAGEURL+fields.old_image_big);
		
		   
		        /******** end resize  *******/
		     }
			 /********* end here upload  *********/
			var sql='update tbl_portfolio set name="'+fields.name+'",link="'+fields.link+'",big_image="'+big_image1+'",description="'+fields.description+'",modified_date="'+modified_date+'" where id='+fields.id+'';	       
	      
			con.query(sql, function(errors,rows){
	 		
	       });

	    });
		res.redirect('/admin/view-portfolio'+'?status=update');

	}
	con.query('select * from tbl_portfolio where id='+req.query.id+'',function(err,rows){	
	 res.render('admin/edit-portfolio', {
	       title: 'Edit portfolio',
	       data:rows	      
	      });

	});
});



router.get('/example', function(req,res){
	res.render('admin/example');
});

module.exports = router;