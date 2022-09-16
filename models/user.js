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
        const updatedCart = {items: [{...product, quantity: 1}]};
        console.log(updatedCart);
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