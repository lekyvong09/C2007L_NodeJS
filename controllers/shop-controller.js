const Product = require('../models/product');
const Order = require('../models/order');
const mongoose = require('mongoose');

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
    req.user
        .populate('cart.items.productId')
        .then(user => {
            const order = new Order({
                items: user.cart.items.map(item => {
                    return {
                        itemId: item._id,
                        title: item.productId.title,
                        price: item.productId.price,
                        imageUrl: item.productId.imageUrl,
                        quantity: item.quantity,
                    }
                }),
                user: {
                    userId: mongoose.Types.ObjectId(user._id)
                }
            });
            return order.save();
        })
        .then(result => {
            const user = req.user;
            user.cart.items = [];
            return user.save();
        })
        .then(result => res.redirect('/order'))
        .catch(err => console.log(err));
}

exports.order = (req, res, next) => {
    Order.find({'user.userId': mongoose.Types.ObjectId(req.user._id)})
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
        }).
        catch(err => console.log(err));
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
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
}

exports.displayShoppingCart = (req, res, next) => {
    // console.log(req.user);
    req.user
        .populate('cart.items.productId')
        .then(user => {
            const products = user.cart.items;
            console.log(products);
            res.render('shop/cart', {
                pageTitle: 'cart',
                cartItems: products
            });
        });
        
}


exports.deleteCartItem = (req, res, next) => {
    const productId = req.body.productId;
    // console.log(productId);
    req.user.deleteItemFromCart(productId)
        .then(result => res.redirect('/cart'))
        .catch(err => console.log(err));
}