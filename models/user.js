const mongoose = require('mongoose');
const Product = require('../models/product');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'},
                quantity: {type: Number, required: true}
            }
        ]
    }
});


userSchema.methods.addToCart = function(product) {
    const updatedCartItems = this.cart.items ? [...this.cart.items] : [];
    const indexExistingCartItem = this.cart.items ? this.cart.items.findIndex(item => item.productId.toString() === product._id.toString()) : -1;

    let newQuantity = 1;
    if (indexExistingCartItem != -1) {
        newQuantity = this.cart.items[indexExistingCartItem].quantity + 1;
        updatedCartItems[indexExistingCartItem].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: mongoose.Types.ObjectId(product._id),
            quantity: newQuantity
        });
    }

    this.cart = {items: updatedCartItems};
    return this.save();
}

// userSchema.methods.getCart = function() {
//     const arrayOfProductId = this.cart.items ? this.cart.items.map(i => i.productId) : [];

//     return Product
//         .find({_id: {$in: arrayOfProductId}})
//         .then(
//             products => {
//                 return products.map(product => {
//                     let cartItem = this.cart.items.find(i => i.productId.toString() === product._id.toString());
//                     return {...product.toObject(), quantity: cartItem.quantity};
//                 });
//             }
//         )
// }

userSchema.methods.deleteItemFromCart = function(productId) {
    const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId);
    this.cart.items = updatedCartItems;
    return this.save();
}

module.exports = mongoose.model('User', userSchema);