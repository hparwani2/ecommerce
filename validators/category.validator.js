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

function validateCategoryId(request, response, next) {
    let categoryId = Number(request.params.id);

    if(!categoryId) {
        response.setHeader('content-type', 'application/json');
        response.writeHead(400);
        response.end(JSON.stringify({
            message: 'categoryId is either undefined or NaN'
        }));
    }
    next();
}

module.exports = {
    validateRequestBody,
    validateCategoryId
}