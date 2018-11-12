var formidable  = require('formidable');
var fs          = require('fs');
module.exports.upload=function(files)
{
  var locals = [];
  var ttt='vinayamit';
  async.parallel(
    [
       function(callback)
       {
       	    var oldpath = files.image.path;        
		    var newpath = IMAGEURL + files.image.name;    
		    fs.rename(oldpath, newpath, function (err) { 
		    	if(!err)
		    	{		    		
		    		locals.push({filename:files.image.name});
		    	}
		    	else
		    	{
		    		locals.push({filename:''});		    		
		    	}
		    	callback();
		      });       
       }   

    ],
     function(err, results)
      {  
      	
      }
  ); 
  return files.image.name;
} 
