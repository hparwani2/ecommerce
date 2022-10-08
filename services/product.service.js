let db = require("../models/index");

class ProductService {

    constructor() {
        this.schema = db.product;
    }

    createProduct(product) {
        return this
        .schema
        .create(product);
    }

    getProducts() {
        //filters['maxprice'] = Number(filters['maxprice']);

        return this
        .schema
        .findAll({
            include: [{
                required: true,
                model: db.category
            }]
        });
    }

    getProductById(id) {
        return this
        .schema
        .findOne({
            where: {
                id: id
            },
            include: [{
                required: true,
                model: db.category
            }]
        });
    }

    updateProduct(updatedProduct, id) {
        return this
        .schema
        .update(updatedProduct, {
            returning: true,
            where: {
                id: id
            }
        })
    }

    deleteProductById(id) {
        return this
        .schema
        .destroy({
            where: {
                id: id
            }
        });
    }
}

let productService = new ProductService();
module.exports = {
    productService
}