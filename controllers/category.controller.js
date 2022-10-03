let express = require('express');
let categoryRouter = express.Router();

let { categoryService } = require('../services/category.service');
let { executeWithSync } = require('../connections/sequelize.connection');

categoryRouter.get('/', function(request, response) {
    executeWithSync(categoryService
    .getCategories()
    .then((data) => data.map((single) => single.dataValue))
    .then((data) => {
        response.setHeader('content-type', 'application/json');
        response.writeHead(200);
        response.end(JSON.stringify(data));
    }).catch((error) => {
        response.setHeader('content-type', 'application/json');
        response.writeHead(500);
        console.log('Error Occurred while fetching categories');
        response.end(JSON.stringify({
            message: 'error occured'
        }));
    }));
});

categoryRouter.post('/', function(request, response) {
    executeWithSync(categoryService
    .createCategories(request.body)
    .then((data) => data.map((single) => single.dataValue))
    .then((data) => {
        response.setHeader('content-type', 'application/json');
        response.writeHead(200);
        response.end(JSON.stringify(data));
    }).catch((error) => {
        response.setHeader('content-type', 'application/json');
        response.writeHead(500);
        console.log('Error Occurred while creating categories');
        response.end(JSON.stringify({
            message: 'error occured'
        }));
    }));
});


module.exports = {
    categoryRouter
}