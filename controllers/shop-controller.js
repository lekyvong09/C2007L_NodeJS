const Product = require('../models/product');


exports.getProductList = (req, res, next) => {
    // console.log('in shop.js', adminData.products);
    Product.fetchAll()
        .then((result) => {
            // console.log(result);
            res.render('shop/product-list', {
                pageTitle: 'Shop',
                products: result,
                path: '/'
            });
        })
        .catch(err => console.log(err));
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