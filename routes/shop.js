const express = require('express');
const router = express.Router();
const path = require('path');
const adminData = require('./admin');


router.get('/', (req, res, next) => {
    // console.log('in shop.js', adminData.products);
    res.render('shop', {
        pageTitle: 'Shop',
        products: adminData.products,
        path: '/'
    });
});


module.exports = router;