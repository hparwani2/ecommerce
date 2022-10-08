const categoryController = require("../controllers/category.controller")
const categoryValidator = require('../validators/category.validator');

module.exports = function(app){
    
    //Route for the POST request to create the category
    app.post("/ecomm/api/v1/categories",[categoryValidator.validateRequestBody], categoryController.create);

    //Route for the GET request to fetch all the categories
    app.get("/ecomm/api/v1/categories", categoryController.findAll);

    //Route for the GET request to fetch a category based on the id
    app.get("/ecomm/api/v1/categories/:id",[categoryValidator.validateProductId], categoryController.findOne);

    //Route for the PUT request to update a category based on the id
    app.put("/ecomm/api/v1/categories/:id",[categoryValidator.validateProductId, categoryValidator.validateRequestBody],categoryController.update);

    //Route for the DELETE request to delete a category based on the id
    app.delete("/ecomm/api/v1/categories/:id",[categoryValidator.validateProductId], categoryController.deleteCategory);
}