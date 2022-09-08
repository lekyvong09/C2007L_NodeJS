const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require('../controllers/product-controller');


router.get('/add-product', productController.showAddProductForm);
router.get('/edit-product', productController.showEditProductForm);
router.get('/list-product', productController.listProduct);

router.post('/edit-product', productController.updateProduct);
router.post('/product', productController.insertNewProduct);


module.exports = router;