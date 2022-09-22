const Product = require('../models/product');


exports.getProductList = (req, res, next) => {
    // console.log('in shop.js', adminData.products);
    Product.find()
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

exports.checkout = (req, res, next) => {
    req.user.checkout()
        .then(result => res.redirect('/order'));
}

exports.order = (req, res, next) => {
    req.user.getOrders()
        .then(orders => {
            const transformedOrders = orders.map(order => ({
                _id: order._id,
                items: order.items,
                user: order.user,
                total: order.items.reduce((sum, item) => sum + +item.price*item.quantity, 0)
            }));
            res.render('shop/order', {
                path: '/order',
                pageTitle: 'Orders',
                orders: transformedOrders
            })
        })
}

exports.addItemToCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId)
        .then(product => {
            // console.log(req.user);
            return req.user.addToCart(product);
        })
        .then(result => {
            console.log(result);
            res.redirect('/');
        })
        .catch(err => console.log(err));
}

exports.displayShoppingCart = (req, res, next) => {
    // console.log(req.user);
    req.user.getCart()
        .then(result => {
            // console.log(result);
            res.render('shop/cart', {
                pageTitle: 'cart',
                cartItems: result
            });
        });
}


exports.deleteCartItem = (req, res, next) => {
    const productId = req.body.productId;
    console.log(productId);
    req.user.deleteItemFromCart(productId)
        .then(result => res.redirect('/cart'))
        .catch(err => console.log(err));
}