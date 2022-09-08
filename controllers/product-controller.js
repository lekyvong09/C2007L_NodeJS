const Product = require("../models/product");

exports.showAddProductForm = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
}


exports.insertNewProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}


exports.getProductList = (req, res, next) => {
    // console.log('in shop.js', adminData.products);
    const products = Product.fetchAll();
    res.render('shop', {
        pageTitle: 'Shop',
        products: products,
        path: '/'
    });
}