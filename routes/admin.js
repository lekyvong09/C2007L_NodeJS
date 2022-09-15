const express = require('express');
const router = express.Router();
const path = require('path');
const productController = require('../controllers/product-controller');


router.get('/add-product', productController.showAddProductForm);
/// /admin/edit-product/{productId}
router.get('/edit-product/:productId', productController.showEditProductForm);
router.get('/list-product', productController.listProduct);

router.post('/edit-product', productController.updateProduct);
router.post('/product', productController.insertNewProduct);
router.post('/delete-product', productController.deleteProduct);


module.exports = router;