const connectDB = require('./config/db');
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors");
const cookieParser = require('cookie-parser');
const User = require('./models/User');
const Product = require('./models/Product');

const passport = require('passport');
const session = require('express-session');
const app = express();



// MUST BE Below express-session
const MongoStore = require('connect-mongo')(session);

// Passport config
require('./config/passportLocal')(passport);

// Session MUST BE ABOVE PASSPORT MIDDLEWARE
app.use(session({
    secret: process.env.MY_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection})
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  

// Setting user variable
  app.use(function(req, res, next) {
    if(req.user) {
      res.locals.user = {
        email:req.user.email,
        _id: req.user._id
        }
    } else {
      res.locals.user = null;
    }
     
    next();
  });



// Load config
dotenv.config({ path: './config/config.env'});


// Body parser
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//Static folder
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 4000;
connectDB();

// CORS 
app.use(
  cors({ 
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

//Routes
app.use('/', require('./routes/index'));
app.use('/products', require('./routes/product'));
app.use('/users', require('./routes/user'));



app.listen(port, () => {
    console.log(`app listenig on port ${process.env.PORT}`)
});






