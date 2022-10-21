const request = require('supertest');
const app = require('../../app');
const db = require('../../models/index');
require('../../routes/category.route')(app);

describe('create categories', () => {

    beforeAll(async () => {
        await db.sequelize.sync();
    });
    it('should return success response', async () => {
        const res = await request(app)
        .post('/ecomm/api/v1/categories')
        .send({
            name: 'Electronics',
            description: 'This contains electronic items'
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.id).toBeTruthy();
    })
})