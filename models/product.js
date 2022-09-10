const products = [];

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id = Math.random();
        products.push(this);
    }

    static findById(id) {
        return products.find(i => i.id === +id);
    }

    static fetchAll() {
        return products;
    }
}