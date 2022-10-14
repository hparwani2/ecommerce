const authValidator = require("../validators/auth.validator");
const cartValidator = require("../validators/cart.validator");
const cartController = require("../controllers/cart.controller");

module.exports = function(app) {

    app.post('/ecomm/api/v1/carts', [ authValidator.verifyJwt ],  cartController.create);

    app.put('/ecomm/api/v1/carts/:id', [ authValidator.verifyJwt, cartValidator.checkForItemIds ], cartController.update);

    app.get('/ecomm/api/v1/carts/:id', [ authValidator.verifyJwt ], cartController.getCart);
}