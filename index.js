const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8002;
 const expressEjsLayouts = require('express-ejs-layouts');
 const db= require('./config/mongoose');
 //used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportlocal  = require('./config/passport-local-strategy'); 
const MongoStore = require('connect-mongo');
const sassMiddleware =require('node-sass-middleware');


app.use(sassMiddleware({
  src: './assets/scss',
  dest: './assets/css',
  debug: true,
  outputStyle: 'extended',
  prefix: '/css'
}));

 app.use(express.urlencoded());
 app.use(cookieParser());
 app.use(express.static('./assets'));

 app.use(expressEjsLayouts);
 //extract style and scripts from sub pages into the layout
 app.set('layout extractStyles',true);
 app.set('layout extractScripts',true);


//setup the view engine
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//mongo store  is used to store the session cookie in the db
app.use(session({
  name: 'codeial',
  //ToDo change the secret before deployment in production mode
  secret: 'blahsomething',
  saveUnitialized: false,
  resave: false,
  cookie: {
    maxAge: (1000 * 60 * 100)
  },
  store: MongoStore.create(
    {
      mongoUrl: 'mongodb://localhost/codeial_development',
    //  collection: 'mySessions'
    
      // mongooseConnection: db,
      // autoRemove: 'disabled'
    
  },
  function(err){
    console.log(err || 'connect-mongodb setup ok');
  }
  )
}));



app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

 //use express router
 app.use('/',require('./routes'));


app.listen(port,function(err){
    if(err){
      //  console.log('Error:',err);
   console.log(`Error in running server: ${err}`);
    }
    console.log(`server is running on port: ${port}`);

});