const express = require('express');
const router = express.Router();
const path = require('path');
const adminData = require('./admin');
const shopController = require('../controllers/shop-controller');


// router.get('/checkout', shopController.checkout);
router.get('/', shopController.getProductList);
// router.get('/cart', shopController.displayShoppingCart);
// router.get('/order', shopController.order);

// router.post('/cart', shopController.addItemToCart);
// router.post('/cart-delete-item', shopController.deleteCartItem);
// router.post('/checkout', shopController.checkout);

module.exports = router;