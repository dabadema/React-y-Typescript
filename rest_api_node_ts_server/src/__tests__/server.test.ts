import { connectDB } from '../server';
import db from '../config/db';

jest.mock('../config/db');

describe('connectDB', () => {
    it('Should handle database connection errors', async () => {
        jest.spyOn(db, 'authenticate').mockRejectedValueOnce(new Error('Failed to connect to DB'));

        const consoleSpy = jest.spyOn(console, 'log');

        await connectDB();

        expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Failed to connect to DB'));
    });
});
