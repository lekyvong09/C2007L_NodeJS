const Product = require('../models/product');


exports.getProductList = (req, res, next) => {
    // console.log('in shop.js', adminData.products);
    const products = Product.fetchAll();
    res.render('shop/product-list', {
        pageTitle: 'Shop',
        products: products,
        path: '/'
    });
}


exports.shoppingCart = (req, res, next) => {
    res.render('shop/cart', {
        pageTitle: 'Cart',
        path: '/cart'
    });
}

exports.checkout = (req, res, next) => {
    res.render('shop/checkout', {
        pageTitle: 'checkout',
        path: '/checkout'
    });
}