const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require('../controllers/product-controller');


router.get('/add-product', productController.showAddProductForm);

router.post('/product', productController.insertNewProduct);


module.exports = router;