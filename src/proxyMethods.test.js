const handler = require('../index').handler;
const AWS = require('aws-sdk-mock');

describe('Lambda tests', () => {
    beforeEach(() => {
        AWS.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
            callback(null, 'Success');
        });
        AWS.mock('DynamoDB.DocumentClient', 'update', (params, callback) => {
            callback(null, 'Success');
        });
        AWS.mock('DynamoDB.DocumentClient', 'delete', (params, callback) => {
            callback(null, 'Success');
        });
    });
    afterEach(() => {
        AWS.restore('DynamoDB.DocumentClient');
    });

    it('should create an item', async () => {
        const event = { body: JSON.stringify({ action: 'post', productId: 1, productName: 'Silla' }) };
        const result = await handler(event);
        expect(result.statusCode).toBe(200);
        expect(result.body).toBe(JSON.stringify({ productId: 1, productName: 'Silla' }));
    });
    it('should update an item', async () => {
        const event = { body: JSON.stringify({ action: 'put', productId: 1, productName: 'cajon' }) };
        const result = await handler(event);
        expect(result.statusCode).toBe(200);
        expect(result.body).toBe(JSON.stringify('Success'));
    });
    it('should delete an item', async () => {
        const event = { body: JSON.stringify({ action: 'delete', productId: 1 }) };
        const result = await handler(event);
        expect(result.statusCode).toBe(200);
        expect(result.body).toBe(JSON.stringify('Success'));
    });
});
