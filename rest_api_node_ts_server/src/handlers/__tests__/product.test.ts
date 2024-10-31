import request from 'supertest';
import server from '../../server';

describe('POST /api/products', () => {
    it('Should create a new product', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Mouse - Testing',
            price: 10,
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('data');

        expect(response.status).not.toBe(404);
        expect(response.status).not.toBe(200);
    });
});
