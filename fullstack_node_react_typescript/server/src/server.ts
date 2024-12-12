import express from 'express';
import router from './router';
import colors from 'colors';
import cors, { CorsOptions } from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec, swaggerUiOptions } from './config/swagger';
import db from './config/db';
import { Server } from 'http';

//Connect to DB
export const connectDB = async () => {
    try {
        await db.authenticate();
        console.log(colors.green('Connected to DB successfully'));
        db.sync();
    } catch (error) {
        console.log(error);
        console.log(colors.red('Failed to connect to DB'));
    }
};

connectDB();

// Express instance
const server = express();

// Connections allowed

const corsOptions: CorsOptions = {
    origin: function (origin, callback) {
        if (origin === process.env.FRONTEND_URL) {
            callback(null, true);
        } else {
            callback(new Error('Error de CORS'));
        }
    },
};

server.use(cors(corsOptions));

// Reading data from forms
server.use(express.json());

server.use('/api/products', router);

// Docs
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));

let appServer: Server | null = null;

export const startServer = (port: number = 4000): Server => {
    if (!appServer) {
        appServer = server.listen(port, () => {
            if (process.env.NODE_ENV !== 'test') {
                console.log(`Server running on port ${port}`);
            }
        });
    }
    return appServer;
};

export const closeServer = (): Server | undefined => {
    if (appServer) {
        return appServer.close();
    }
    return undefined;
};

export default server;
