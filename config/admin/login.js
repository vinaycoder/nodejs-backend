var bcrypt=require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
//var hash = bcrypt.hashSync("vinay", salt);   // generate passwored
module.exports.checkSession=function(req,res){  

  if(req.session.admin)
  {
  	  res.redirect('/admin/dashboard');
  }
  else
  {
         res.render('admin/index', {
               title: 'Login'
              // flashMessage: getMessage('danger','Login Please')
               });
  	   
  }
}
module.exports.checkProfile=function(req,res)
{
  if(!req.session.admin)
  {
      res.redirect('/admin');
  }

}

module.exports.login=function(req, res)
{

  var locals = {};
  async.parallel(
    [
       function(callback)
       {
        var sql = 'select * from tbl_admin where username = ' + mysql.escape(req.body.username);
        con.query(sql,function(errors, rows){
          locals.userdata = rows;
                callback();
        });
       }   

    ],
      function(err, results)
      { 
        if(locals.userdata.length==1)
        {
          var matchpass=bcrypt.compareSync(req.body.password, locals.userdata[0].password);
          if(matchpass)
          {
             var admin = 
              {
               "name":locals.userdata[0].name,
               "type":"admin",
               "email":locals.userdata[0].email,
               "id":locals.userdata[0].id,
               "image":locals.userdata[0].image,
               "username":locals.userdata[0].username
              }; 
              req.session.admin = admin;     
              global.adminProfile=admin;   
              res.redirect('admin/dashboard'); 

          }
          else
          {
            /*invalid password*/
            res.render('admin/index', {
               title: 'Login',
               flashMessage: getMessage('danger','Invalid password')
               });

          }
          
        }
        else
        {
          /*invalid user name*/       
             res.render('admin/index', {
               title: 'Login',
               flashMessage: getMessage('danger','Invalid user name')
               });

        }
                
              
      }
    
    );
  
}