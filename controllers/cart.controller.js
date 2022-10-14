let { cartService } = require('../services/cart.service');
let { productService } = require('../services/product.service');

function create(request, response) {
    let userId = request.decodedJwt.id;
    let cart = {
        userId: userId
    };
    cartService
    .createCart(cart)
    .then(cart => {
        cart = cart.dataValues;
        cart.message = 'cart created successfully';
        console.log('Cart created successfully for userId {}', userId);
        response.setHeader('content-type', 'application/json');
        response.writeHead(201);
        response.end(JSON.stringify(cart));
    }).catch(error => {
        console.log('error occured while creating cart', error);
        response.setHeader('content-type', 'application/json');
        response.writeHead(500);
        response.end(JSON.stringify({
            message: 'error occured while creating cart'
        }));
    });
}

function update(request, response) {
    let cartId = request.params.id;
    let itemIds = request.body.items;

    cartService
    .getCartById(cartId)
    .then((cart) => {
        if(cart) {
            return productService
            .getProductsById(itemIds)
            .then((products) => {
                cart.setProducts(products);
                cart = cart.dataValues;
                cart.message = 'cart updated successfully';
                response.setHeader('content-type', 'application/json');
                response.writeHead(404);
                response.end(JSON.stringify(cart));
            });
        } else {
            console.log('cart is not present with id', cartId);
            response.setHeader('content-type', 'application/json');
            response.writeHead(404);
            response.end(JSON.stringify({
                message: `cart is not present for ${cartId}`
            }));
        }
    }).catch(error => {
        console.log('error occurred while updating cart');
        response.setHeader('content-type', 'application/json');
        response.writeHead(500);
        response.end(JSON.stringify({
            message: error.message
        }));
    });

}

function getCart(request, response) {
    // TODO
}

module.exports = {
    create,
    update,
    getCart
}