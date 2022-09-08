const Product = require("../models/product");

exports.showAddProductForm = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
}


exports.insertNewProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
}


exports.listProduct = (req, res, next) => {
    res.render('admin/list-product', {
        pageTitle: 'List Product',
        path: '/admin/list-product'
    });
}

exports.showEditProductForm = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product'
    });
}


exports.updateProduct = (req, res, next) => {
    res.redirect('/');
}