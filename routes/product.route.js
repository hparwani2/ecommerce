const productController = require('../controllers/product.controller');
const productValidator = require('../validators/product.validator');

module.exports = function(app) {

    //Route for the POST request to create the product
    app.post("/ecomm/api/v1/products", [productValidator.validateRequestBody], productController.create);
 
    //Route for the GET request to fetch all the products
    app.get("/ecomm/api/v1/products", productController.findAll);

    //Route for the GET request to fetch a product based on the id
    app.get("/ecomm/api/v1/products/:id", [productValidator.validateProductId] ,productController.findOne);

    //Route for the PUT request to update a product based on the id
    app.put("/ecomm/api/v1/products/:id", [productValidator.validateProductId, productValidator.validateRequestBody], productController.update);

    //Route for the DELETE request to delete a product based on the id
    app.delete("/ecomm/api/v1/products/:id", [productValidator.validateProductId] ,productController.deleteProduct);
}