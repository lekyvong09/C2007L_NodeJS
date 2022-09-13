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

    Product.create({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    })
    .then(result => {
        // console.log(result);
        res.redirect('/admin/list-product');
    })
    .catch(err => console.log(err));
}


exports.listProduct = (req, res, next) => {
    Product.findAll()
        .then((result) => {
            // console.log(data);
            res.render('admin/list-product', {
                pageTitle: 'List Product',
                path: '/admin/list-product',
                products: result
            });
        });
}

exports.showEditProductForm = (req, res, next) => {
    const productId = req.params.productId;
    Product.findByPk(productId)
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

    const id = +req.body.productId;
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;

    Product.update({
        title: title,
        price: price,
        imageUrl: imageUrl,
        description: description
    }, {
        where: {
            id: id
        }
    })
    .then(() => res.redirect('/admin/list-product'))
    .catch(err => console.log(err));
}

exports.deleteProduct = (req, res, next) => {
    Product.findByPk(+req.body.productId)
        .then(product => {
            return product.destroy();
        })
        .then(() => res.redirect('/admin/list-product'))
        .catch(err => console.log(err));
}