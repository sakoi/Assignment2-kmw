var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var orders = require('./routes/orders');

var app = express();

//Connect to mongodb
var mongoose = require('mongoose');
var config = require('./config/globalVars');
mongoose.connect(config.db);

//connect to passport
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var localStrategy = require('passport-local').Strategy; //refeneces

app.use(flash());
app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

//use Account model
var Account = require('./models/account');
passport.use(Account.createStrategy());

//Facebook Authentication
var facebookStrategy = require('passport-facebook').Strategy;

passport.use(new facebookStrategy({
      clientID: config.ids.facebook.clientID,
      clientSecret: config.ids.facebook.clientSecret,
      callbackURL: config.ids.facebook.callbackURL
    },
    function(accessToken, refreshToken, profile, cb){

      Account.findOne({oauthID: profile.id}, function(err, user){
        if(err){
          console.log(err);
        }else{
          if(user !== null){
            //already registered via FB, so continue
            cb(null,user);
          }else{
            //user not registered already, so save to collection
            user = new Account({
              oauthID: profile.id,
              username: profile.displayName,
              //when we created
              created: Date.now()
            });

            user.save(function(err){
              if(err){
                console.log(err);
              }else{
                cb(null, user);
              }
            });
          }
        }

      });

    }));

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/orders', orders);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;