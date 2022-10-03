let { categorySchema } = require("../models/category.model");
class CategoryService {

    constructor() {
        this.schema = categorySchema
    }

    createCategories(category) {
        return this
        .schema
        .create(category);
    }

    getCategories() {
        return this
        .schema
        .findAll();
    }

    getCategoryById(id) {
        return this
        .schema
        .findOne({
            where: {
                id: id
            }
        });
    }
}

let categoryService = new CategoryService();
module.exports = {
    categoryService
}