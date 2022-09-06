const products = [];

exports.showAddProductForm = (req, res, next) => {
    res.render('add-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product'
    });
}


exports.insertNewProduct = (req, res, next) => {
    products.push({
        title: req.body.title
    });
    res.redirect('/');
}


exports.getProductList = (req, res, next) => {
    // console.log('in shop.js', adminData.products);
    res.render('shop', {
        pageTitle: 'Shop',
        products: products,
        path: '/'
    });
}