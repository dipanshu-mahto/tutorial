const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser')
const app = express();
const port = 8002;
 const expressLayouts = require('express-ejs-layouts');
 const db= require('./config/mongoose');

 app.use(express.urlencoded());
 app.use(cookieParser());
 app.use(express.static('./assets'));

 app.use(expressLayouts);
 //extract style and scripts from sub pages into the layout

 app.set('layout extractStyles',true);
 app.set('layout extractScripts',true);
 //use express router
app.use('/',require('./routes'));


//setup the view engine


app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.listen(port,function(err){
    if(err){
      //  console.log('Error:',err);
   console.log(`Error in running server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);

});
