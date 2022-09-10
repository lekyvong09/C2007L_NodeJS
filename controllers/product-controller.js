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
    const product = new Product(null, title, imageUrl, description, price);
    // console.log(product);
    product.save()
        .then(() => res.redirect('/admin/list-product'))
        .catch(err => console.log(err));
}


exports.listProduct = (req, res, next) => {
    const products = Product.fetchAll()
        .then(([rows, fieldData]) => {
            // console.log(data);
            res.render('admin/list-product', {
                pageTitle: 'List Product',
                path: '/admin/list-product',
                products: rows
            });
        });
}

exports.showEditProductForm = (req, res, next) => {
    const productId = req.params.productId;
    let product = Product.findById(productId)
        .then(([rows, fieldData]) => {
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                product: rows[0]
            });
        });
}


exports.updateProduct = (req, res, next) => {
    let imageUrl = req.body.imageUrl;

    const image = req.file;
    if (image) {
        imageUrl = image.path;
    }

    const id = +req.body.productId;
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(id, title, imageUrl, description, price);
    product.save();
    res.redirect('/admin/list-product');
}

exports.deleteProduct = (req, res, next) => {
    Product.delete(req.body.productId);
    res.redirect('/admin/list-product');
}