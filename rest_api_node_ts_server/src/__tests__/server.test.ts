import request from 'supertest';
import app, { startServer, closeServer, connectDB } from '../server';
import db from '../config/db';

describe('GET /api', () => {
    let server: any;

    beforeAll(async () => {
        await db.authenticate();
        await db.sync();
        server = startServer();
    });

    afterAll(async () => {
        await db.close();
    });

    afterEach(async () => {
        await new Promise<void>((resolve) => {
            closeServer()?.on('close', () => resolve());
        });
    });

    it('Should return a json response with a message', async () => {
        const response = await request(app).get('/api');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toMatch(/json/);
        expect(response.body.message).toBe('Desde API');

        expect(response.status).not.toBe(404);
        expect(response.body.message).not.toBeNull();
    });
});

jest.mock('../config/db');

describe('connectDB', () => {
    it('Should handle database connection errors', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Failed to connect to DB'));

        const consoleSpy = jest.spyOn(console, 'log');

        await connectDB();

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Failed to connect to DB'));
    });
});
