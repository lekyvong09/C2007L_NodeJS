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

    const product = new Product({
        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl
    });

    product.save()
        .then(result => res.redirect('/admin/list-product'))
        .catch(err => console.log(err));
}


exports.listProduct = (req, res, next) => {
    Product.find()
        .then((result) => {
            // console.log(data);
            res.render('admin/list-product', {
                pageTitle: 'List Product',
                path: '/admin/list-product',
                products: result
            });
        })
        .catch(err => console.log(err));
}

exports.showEditProductForm = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then((result) => {
            res.render('admin/edit-product', {
                pageTitle: 'Edit Product',
                path: '/admin/edit-product',
                product: result
            });
        });
}


exports.updateProduct = (req, res, next) => {
    let imageUrl = req.body.imageUrl;

    const image = req.file;
    if (image) {
        imageUrl = image.path;
    }

    const productId = req.body.productId;
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(productId, title, price, description, imageUrl);
    product.save()
        .then(() => res.redirect('/admin/list-product'))
        .catch(err => console.log(err));
}

exports.deleteProduct = (req, res, next) => {
    Product.deleteById(req.body.productId)
        .then(result => res.redirect('/admin/list-product'))
        .catch(err => console.log(err));
}