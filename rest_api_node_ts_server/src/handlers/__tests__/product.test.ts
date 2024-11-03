import request from 'supertest';
import server from '../../server';

describe('POST /api/products', () => {
    it('Should display validation errors', async () => {
        const response = await request(server).post('/api/products').send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(4);

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2);
    });

    it('Should validate that the price is greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Monitor Curvo - Testing',
            price: 0,
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(2);
    });

    it('Should validate that the price is a number and greater than 0', async () => {
        const response = await request(server).post('/api/products').send({
            name: 'Monitor Curvo - Testing',
            price: 'hola',
        });
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(2);

        expect(response.status).not.toBe(404);
        expect(response.body.errors).not.toHaveLength(4);
    });

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

describe('GET /api/products/:id', () => {
    it('Should return a 404 response if the product is not found', async () => {
        const productId = '20000    ';
        const response = await request(server).get(`/api/products/${productId}`);
        expect(response.status).toBe(404);
        expect(response.body).toHaveProperty('message');
        expect(response.body.message).toBe('Product not found');
    });

    it('Should check a valid ID in the URL', async () => {
        const response = await request(server).get('/api/products/not-valid-url');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Id must be a number');
    });

    it('get a JSON response for a single product', async () => {
        const response = await request(server).get('/api/products/1');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
    });
});
