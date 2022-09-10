let products = [];
const connectionPool = require('../util/database');

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        return connectionPool.execute('insert into products (title, price, description, imageUrl) values (?, ?, ?, ?)', [this.title, this.price, this.description, this.imageUrl]);
    }

    static delete(id) {
        var index = products.findIndex(i => i.id === +id);
        if (index > -1) {
            products.splice(index, 1);
        }
    }

    static findById(id) {
        return connectionPool.execute(`select * from products where id =${id}`);
    }

    static fetchAll() {
        return connectionPool.execute('select * from products');
    }
}