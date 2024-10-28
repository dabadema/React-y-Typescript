import express from 'express';
import router from './router';
import colors from 'colors';
import db from './config/db';

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

// Express instance
const server = express();

// Reading data from forms
server.use(express.json());

server.use('/api/products', router);

export default server;
