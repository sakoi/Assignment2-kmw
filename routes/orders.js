var express = require('express');
var router = express.Router();

var Order = require('../models/order');

/* Get handler for /orders */
router.get('/', function (req, res, next) {
   Order.find(function(err, orders){
       if(err){
           console.log(err);
           res.render('error');
       }else{
           res.render('orders', {
               title: 'order list',
               orders: orders
           });
       }
   });
});

/* Get handler for /orders/add */
router.get('/add', function(req, res, next){
   res.render('add', {
        title: 'New Order'
   });
});

/* Post handler for /orders/add */
router.post('/add', function(req, res, next){
    Order.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        paymentType: req.body.paymentType,
        orderItem: req.body.orderItem,
        orderUnit: req.body.orderUnit,
        orderAddon: req.body.orderAddon,
        orderComment: req.body.orderCommnet
    }, function(err, Order){
        if(err){
            console.log(err);
            res.render('error');
        }else{
            res.redirect('/orders');
        }
    })
});

/* GET /orders/delete/:_id */
router.get('/delete/:_id', function(req, res, next) {
    var _id = req.params._id;

    Order.remove( { _id: _id }, function(err) {
        if (err) {
            console.log(err);
            res.render('error', {message: 'Delete Error'});
        }
        res.redirect('/orders');
    });
});

module.exports = router;