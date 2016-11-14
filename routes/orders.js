var express = require('express');
var router = express.Router();

var Order = require('../models/order');

/* Get handler for /order */
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

/* Get handler for /order/add */
router.get('/add', function(req, res, next){
   res.render('add', {
        title: 'New Order'
   });
});

/* Post handler for /order/add */
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

module.exports = router;