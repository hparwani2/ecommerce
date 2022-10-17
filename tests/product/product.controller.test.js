const db = require('../../models/index');
const productModel = db.product;
const productController = require('../../controllers/product.controller');
const { mockRequest, mockResponse } = require('../interceptor');

let req, res;

describe("test productController create call", () => {

    beforeEach(() => {
        console.log('calling');
        req = mockRequest();
        res = mockResponse();
    });

    const testPayload = {
        name: 'Samsung s22',
        description: 'Smart camera',
        cost: 110000,
        categoryId: 1
    }

    const responseTestPayload = {
        name: 'Samsung s22',
        description: 'Smart camera',
        cost: 110000,
        categoryId: 1,
        message: 'Product inserted successfully'
    }

    test("should return success message with product details", async () => {
            let spy = jest.spyOn(productModel, 'create').mockImplementation(
                (payload) => new Promise(function(resolve, reject) {
                    let obj = {};
                    obj.dataValues = payload;
                    resolve(obj);
                })
            );

            req.body = testPayload;

            await productController.create(req, res);
            
            expect(spy).toHaveBeenCalled();
            expect(res.status).toEqual(201);
            expect(res.body).toEqual(JSON.stringify(responseTestPayload));
        });

        test("should return error message", async () => {
            req = mockRequest();
            res = mockResponse();
            let spy = jest.spyOn(productModel, 'create').mockImplementation(
                (payload) => new Promise(function(resolve, reject) {
                    reject('Error Connecting Database');
                })
            );

            req.body = testPayload;

            await productController.create(req, res);
            
            expect(spy).toHaveBeenCalled();
            expect(res.status).toEqual(500);
            expect(res.body).toEqual(JSON.stringify({message: 'error occured'}));
        });
});