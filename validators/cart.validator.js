let { productService } = require('../services/product.service');

function checkForItemIds(request, response, next) {
    if(request.body.items) {
        productService
        .getProductsById(request.body.items)
        .then((products) => {
            let presentProducts = products.map((role) => {
                return role.dataValues
            });

            let presentProductObj = {};
            for(let product of presentProducts) {
                let id = product.id;
                presentProductObj[id] = 1;
            }

            let requestedProducts = request.body.items;
            requestedProducts.forEach((requestedProduct) => {
                if(!presentProductObj[requestedProduct]) {
                    response.setHeader('content-type', 'application/json');
                    response.writeHead(400);
                    response.end(JSON.stringify({
                        message: `product with id ${requestedProduct} is not present`
                    }));
                }
            });
            next();
        });
    } else {
        response.setHeader('content-type', 'application/json');
        response.writeHead(400);
        response.end(JSON.stringify({
            message: `No Items Present`
        }));
    }
}

function validateCartId(request, response, next) {
    // TODO: check if it is a number or not
}

module.exports = {
    checkForItemIds,
    validateCartId
}