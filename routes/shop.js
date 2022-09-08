const express = require('express');
const router = express.Router();
const path = require('path');
const adminData = require('./admin');
const shopController = require('../controllers/shop-controller');


router.get('/cart', shopController.shoppingCart);
router.get('/checkout', shopController.checkout);
router.get('/', shopController.getProductList);


module.exports = router;