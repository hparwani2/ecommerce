let { productSchema } = require("../models/product.model");
let { categorySchema } = require("../models/category.model");

class ProductService {

    constructor() {
        this.schema = productSchema
    }

    createProduct(product) {
        return this
        .schema
        .create(product);
    }

    getProducts(filters) {
        filters['maxprice'] = Number(filters['maxprice']);

        return this
        .schema
        .findAll({
            where: {
                price: {
                    lte: 2000
                }
            },
            include: [{
                required: true,
                model: categorySchema
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
                model: categorySchema
            }]
        });
    }
}

let productService = new ProductService();
module.exports = {
    productService
}