var express = require('express');
var router = express.Router();
var Account = require('../models/account')
var passport = require('passport');

/* GET handler for / */
router.get('/', function(req, res, next) {
  res.render('index', {
                        title: 'woole owl',
                        subtitle: 'Order Tracking',
                        user: req.user
    });
});

/* GET handler for /register */
router.get('/register', function(req, res, next) {
    res.render('register', {
        title: 'register',
        messages: '',
        user: req.user
    });
});

/* POST handler for /register */
router.post('/register', function(req, res, next) {
    // use passport and the Account model to save the new user
    Account.register(new Account({ username: req.body.username }),
                                   req.body.password, function(err, account) {
            if (err) {
                console.log(err);
                res.render('register', {
                    title: 'register',
                    messages: 'Username already used',
                    user: req.user
                });
            }else {
                res.redirect('/login');
            }
        });
});

/* GET handler for /login */
router.get('/login', function(req, res, next) {

    // get session messages if there are any
    var messages = req.session.messages || [];

    res.render('login', {
        title: 'login',
        messages: messages,
        user: req.user
    });

    // clear the messages out of the session
    req.session.messages = null;
});

/* POST handler for /login */
router.post('/login', passport.authenticate('local', {
    successRedirect: '/orders',
    failureRedirect: '/login',
    failureMessage: 'Invalid Login'
}));

/* GET handler for /logout */
router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/login');
});

/*GET FACBOOK!!!! */
router.get('/facebook', passport.authenticate('facebook'), function(req, res, next){
});

/* FB CALL BACK!! */
router.get('/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: 'login',
    failureMessage: 'Invalid Login'
}), function(req,res,nex){
//show cames page
    res.redirect('/orders')
});


module.exports = router;
