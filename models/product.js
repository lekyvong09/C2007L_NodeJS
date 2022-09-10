let products = [];

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        if (this.id) {
            /// update
            const existingProductIndex = products.findIndex(product => product.id === this.id);
            const updatedProducts = [...products];
            updatedProducts[existingProductIndex] = {...this};
            products = updatedProducts;
        } else {
            this.id = Math.random();
            products.push(this);
        }
    }

    static findById(id) {
        return products.find(i => i.id === +id);
    }

    static fetchAll() {
        return products;
    }
}