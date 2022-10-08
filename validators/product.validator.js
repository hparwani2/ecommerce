function validateRequestBody(request, response, next) {
    if(!request.body.name) {
        response.setHeader('content-type', 'application/json');
        response.writeHead(400);
        response.end(JSON.stringify({
            message: 'either body is not correct or present'
        }));
    }
    next();
}

function validateProductId(request, response, next) {
    let productId = Number(request.params.id);

    if(!productId) {
        response.setHeader('content-type', 'application/json');
        response.writeHead(400);
        response.end(JSON.stringify({
            message: 'productId is either undefined or NaN'
        }));
    }
    next();
}

module.exports = {
    validateRequestBody,
    validateProductId
}