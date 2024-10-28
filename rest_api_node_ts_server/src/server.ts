import express from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors';

//Connect to DB
async function connectDB() {
    try {
        await db.authenticate();
        console.log(colors.green('Connected to DB successfully'));
        db.sync();
    } catch (error) {
        console.log(error);
        console.log(colors.red('Failed to connect to DB'));
    }
}

connectDB();

const server = express();

server.use('/api/products', router);

export default server;
