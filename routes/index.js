var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
                        title: 'woole owl',
                        subtitle: 'Order Tracking'
    });
});



module.exports = router;
