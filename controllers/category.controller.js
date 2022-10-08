let { categoryService } = require('../services/category.service');


function create(request, response) {
    
    const category = {
        name: request.body.name,
        description: request.body.description,
    };

    categoryService
    .createCategories(category)
    .then((category) => {
        console.log('category inserted ', category.dataValues);
        let returnValue = category.dataValues;
        returnValue.message = 'Category inserted successfully';
        response.setHeader('content-type', 'application/json');
        response.writeHead(201);
        response.end(JSON.stringify(returnValue));
    }).catch((error) => {
        console.log('error occured while creating category', error);
        response.setHeader('content-type', 'application/json');
        response.writeHead(500);
        response.end(JSON.stringify({
            message: 'error occured'
        }));
    });
}

function findAll(request, response) {
    categoryService
    .getCategories()
    .then((categories) => categories.map((category) => category.dataValues))
    .then((products) => {
        console.log('category fetched', products);
        let returnValue = products;
        returnValue.message = 'categories Fetched successfully';
        response.setHeader('content-type', 'application/json');
        response.writeHead(200);
        response.end(JSON.stringify(returnValue));
    })
    .catch((error) => {
        console.log('error occured while fetching categories', error);
        response.setHeader('content-type', 'application/json');
        response.writeHead(500);
        response.end(JSON.stringify({
            message: 'error occured'
        }));
    })
}

function findOne(request, response) {
    
    let categoryId = Number(request.params.id);

    if(!categoryId) {
        response.setHeader('content-type', 'application/json');
        response.writeHead(400);
        response.end(JSON.stringify({
            message: 'categoryId is either undefined or NaN'
        }));
    }
    categoryService
    .getCategoryById(categoryId)
    .then((category) => {
        console.log('category fetched', category);
        let returnValue = category.dataValues;
        if(returnValue) {
            returnValue.message = 'category Fetched successfully';
        } else {
            returnValue.message = 'No category Found with given id';
        }
        response.setHeader('content-type', 'application/json');
        response.writeHead(200);
        response.end(JSON.stringify(returnValue));
    })
    .catch((error) => {
        console.log('error occured while fetching category', error);
        response.setHeader('content-type', 'application/json');
        response.writeHead(500);
        response.end(JSON.stringify({
            message: 'error occured'
        }));
    });
}

function update(request, response) {

    let categoryId = Number(request.params.id);

    if(!categoryId) {
        response.setHeader('content-type', 'application/json');
        response.writeHead(400);
        response.end(JSON.stringify({
            message: 'categoryId is either undefined or NaN'
        }));
    }

    if(!request.body.name) {
        response.setHeader('content-type', 'application/json');
        response.writeHead(400);
        response.end(JSON.stringify({
            message: 'body should be present'
        }));
    }

    let category = {
        name: request.body.name,
        description: request.body.description
    }
    categoryService
    .updateCategoryById(category, categoryId)
    .then((data) => {
        if(data[1] === 1) {
            categoryService
            .getCategoryById(categoryId)
            .then((category) => {
                console.log('category updated', category.dataValues);
                let returnValue = category.dataValues;
                returnValue.message = 'category updated successfully';
                response.setHeader('content-type', 'application/json');
                response.writeHead(200);
                response.end(JSON.stringify(returnValue));
            }); 
        } else {
            console.log('category is not updated with id', categoryId);
            response.setHeader('content-type', 'application/json');
            response.writeHead(500);
            response.end(JSON.stringify({
                message: 'category Doesnot exist'
            }));
        }
        
    })
    .catch((error) => {
        console.log('error occured while updating category', error);
        response.setHeader('content-type', 'application/json');
        response.writeHead(500);
        response.end(JSON.stringify({
            message: 'error occured'
        }));
    })

}

function deleteCategory(request, response) {
    
    let categoryId = Number(request.params.id);

    if(!categoryId) {
        response.setHeader('content-type', 'application/json');
        response.writeHead(400);
        response.end(JSON.stringify({
            message: 'categoryId is either undefined or NaN'
        }));
    }
    categoryService
    .deleteCategoryById(categoryId)
    .then((category) => {
        console.log('category Deleted', category);
        let returnValue = category;
        returnValue.message = 'category Deleted successfully';
        response.setHeader('content-type', 'application/json');
        response.writeHead(200);
        response.end(JSON.stringify(returnValue));
    })
    .catch((error) => {
        console.log('error occured while Deleting category', error);
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
    deleteCategory
}