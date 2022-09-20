const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

class User {
    constructor(_id, username, email, cart) {
        this.name = username;
        this.email = email;
        this.cart = cart ? cart : {items: []};
        this._id = _id;
    }

    addToCart(product) {
        const db = getDb();
        const updatedCartItems = [...this.cart.items];
        const indexExistingCartItem = this.cart.items.findIndex(item => item.productId.toString() === product._id.toString());
        let newQuantity = 1;

        if (indexExistingCartItem != -1) {
            newQuantity = this.cart.items[indexExistingCartItem].quantity + 1;
            updatedCartItems[indexExistingCartItem].quantity = newQuantity;
        } else {
            updatedCartItems.push({
                productId: new mongodb.ObjectId(product._id),
                quantity: newQuantity
            });
        }

        const updatedCart = {items: updatedCartItems};
        // console.log(updatedCart);
        return db.collection('users').updateOne(
            /// condition where
            {_id: new mongodb.ObjectId(this._id)},
            /// update
            {$set: {cart: updatedCart}}
        );
    }

    save() {
        const db = getDb();
        return db.collection('users')
            .insertOne(this)
            .then(result => console.log(result))
            .catch(err => console.log(err));
    }

    getCart() {
        const db = getDb();
        const arrayOfProductId = this.cart.items.map(i => i.productId);
        // console.log(arrayOfProductId);

        return db.collection('products')
            .find({_id: {$in: arrayOfProductId}})
            .toArray()
            .then(
                products => {
                    // console.log(products);
                    return products.map(product => {
                        let cartItem = this.cart.items.find(i => i.productId.toString() === product._id.toString());
                        return {...product, quantity: cartItem.quantity};
                    });
                }
            )
    }

    deleteItemFromCart(productId) {
        const db = getDb();
        const updatedCartItems = this.cart.items.filter(item => item.productId.toString() !== productId);
        console.log(updatedCartItems);
        return db.collection('users').updateOne(
            {_id: new mongodb.ObjectId(this._id)},
            {$set: {cart: { items: updatedCartItems}}}
        );
    }

    static findById(userId) {
        const db = getDb();
        return db.collection('users')
            .find({_id: new mongodb.ObjectId(userId)})
            .next()
            .then(user => {
                return user;
            })
            .catch(err => console.log(err));
    }
}

module.exports = User;