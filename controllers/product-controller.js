const Product = require("../models/product");

exports.showAddProductForm = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
}


exports.insertNewProduct = (req, res, next) => {
    const image = req.file;
    if (!image) {
        res.redirect('admin/add-product');
        return;
    }

    const imageUrl = image.path;
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, description, price);
    console.log(product);
    product.save();
    res.redirect('/');
}


exports.listProduct = (req, res, next) => {
    const products = Product.fetchAll();
    res.render('admin/list-product', {
        pageTitle: 'List Product',
        path: '/admin/list-product',
        products: products
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