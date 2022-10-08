let db = require("../models/index");
class CategoryService {

    constructor() {
        this.schema = db.category;
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

    updateCategoryById(category, id) {
        return this
        .schema
        .update(category, {
            returning: true,
            where: {
                id: id
            }
        })
    }

    deleteCategoryById(id) {
        return this
        .schema
        .destroy({
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