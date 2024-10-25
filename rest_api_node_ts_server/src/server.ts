import express from 'express';
import router from './router';
import db from './config/db';

//Connect to DB
async function connectDB() {
    try {
        await db.authenticate();
        console.log('Connected to DB successfully');
        db.sync();
    } catch (error) {
        console.log(error);
    }
}

connectDB();

const server = express();

server.use('/api/products', router);

export default server;
