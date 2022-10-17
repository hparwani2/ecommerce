let { productService } = require('../services/product.service');


function create(request, response) {

    const product = {
        name: request.body.name,
        description: request.body.description,
        cost: request.body.cost,
        categoryId: request.body.categoryId
    };

    return productService
    .createProduct(product)
    .then((product) => {
        console.log('product inserted ', product.dataValues);
        let returnValue = product.dataValues;
        returnValue.message = 'Product inserted successfully';
        // response.setHeader('content-type', 'application/json');
        response.writeHead(201);
        response.end(JSON.stringify(returnValue));
    }).catch((error) => {
        console.log('error occured while creating product', error);
        // response.setHeader('content-type', 'application/json');
        response.writeHead(500);
        response.end(JSON.stringify({
            message: 'error occured'
        }));
    });
}

function findAll(request, response) {
    productService
    .getProducts(request.query)
    .then((products) => products.map((product) => product.dataValues))
    .then((products) => {
        console.log('product fetched', products);
        let returnValue = products;
        returnValue.message = 'Products Fetched successfully';
        response.setHeader('content-type', 'application/json');
        response.writeHead(200);
        response.end(JSON.stringify(returnValue));
    })
    .catch((error) => {
        console.log('error occured while fetching products', error);
        response.setHeader('content-type', 'application/json');
        response.writeHead(500);
        response.end(JSON.stringify({
            message: 'error occured'
        }));
    })
}

function findOne(request, response) {
    let productId = Number(request.params.id);

    productService
    .getProductById(productId)
    .then((product) => {
        console.log('product fetched', product);
        let returnValue = product.dataValues;
        if(returnValue) {
            returnValue.message = 'Product Fetched successfully';
        } else {
            returnValue.message = 'No Product Found with given id';
        }
        response.setHeader('content-type', 'application/json');
        response.writeHead(200);
        response.end(JSON.stringify(returnValue));
    })
    .catch((error) => {
        console.log('error occured while fetching product', error);
        response.setHeader('content-type', 'application/json');
        response.writeHead(500);
        response.end(JSON.stringify({
            message: 'error occured'
        }));
    });
}

function update(request, response) {

    let productId = Number(request.params.id);

    let product = {
        name: request.body.name,
        categoryId: request.body.categoryId
    }
    
    productService
    .updateProduct(product, productId)
    .then((data) => {
        if(data[1] === 1) {
            productService
            .getProductById(productId)
            .then((product) => {
                console.log('product updated', product.dataValues);
                let returnValue = product.dataValues;
                returnValue.message = 'Product updated successfully';
                response.setHeader('content-type', 'application/json');
                response.writeHead(200);
                response.end(JSON.stringify(returnValue));
            }); 
        } else {
            console.log('product is not updated with id', productId);
            response.setHeader('content-type', 'application/json');
            response.writeHead(500);
            response.end(JSON.stringify({
                message: 'Product Doesnot exist'
            }));
        }
        
    })
    .catch((error) => {
        console.log('error occured while updating product', error);
        response.setHeader('content-type', 'application/json');
        response.writeHead(500);
        response.end(JSON.stringify({
            message: 'error occured'
        }));
    })

}

function deleteProduct(request, response) {
    
    let productId = Number(request.params.id);
    productService
    .deleteProductById(productId)
    .then((product) => {
        console.log('product Deleted', product);
        let returnValue = product;
        returnValue.message = 'Product Deleted successfully';
        response.setHeader('content-type', 'application/json');
        response.writeHead(200);
        response.end(JSON.stringify(returnValue));
    })
    .catch((error) => {
        console.log('error occured while Deleting product', error);
        response.setHeader('content-type', 'application/json');
        response.writeHead(500);
        response.end(JSON.stringify({
            message: 'error occured'
        }));
    });
}



module.exports = {
    create,
    findAll,
    findOne,
    update,
    deleteProduct

}