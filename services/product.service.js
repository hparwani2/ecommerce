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

    getProducts(filters) {
        filters = this.buildFilters(filters);

        if(Object.keys(filters).length) {
            return this
            .schema
            .findAll({
                where: filters['product'],
                include: [{
                    required: true,
                    model: db.category,
                    where: filters['category']
                }]
            });
        } else {
            return this
            .schema
            .findAll({
                include: [{
                    required: true,
                    model: db.category,
                }]
            });
        }
        
    }

    getProductsById(ids) {
        return this
        .schema
        .findAll({
            where: {
                id: {
                    [db.Sequelize.Op.or]: ids
                }
            }
        })
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

    buildFilters(filters) {
        let obj = {
            product: {

            },
            category: {

            }
        }
        if(filters.product && filters.product.minCost && filters.product.maxCost) {
            obj['product']['cost'] = {
                [db.Sequelize.Op.gte]: Number(filters.product.minCost),
                [db.Sequelize.Op.lte]: Number(filters.product.maxCost)
            }
        } else if(filters.product && filters.product.minCost) {
            obj['product']['cost'] = {
                [db.Sequelize.Op.gte]: Number(filters.product.minCost)
            }
        } else if(filters.product && filters.product.maxCost) {
            obj['product']['cost'] = {
                [db.Sequelize.Op.lte]: Number(filters.product.maxCost)
            }
        }

        if(filters.product && filters.product.categoryId) {
            obj['product']['categoryId'] = filters.product.categoryId;
        }

        if(filters.category && filters.category.name) {
            obj['category']['name'] = filters.category.name;
        }

        return obj;
    }
}

let productService = new ProductService();
module.exports = {
    productService
}