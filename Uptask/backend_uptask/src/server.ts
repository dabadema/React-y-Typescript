import express from 'express';
import dotenv, { config } from 'dotenv';
import { connectDB } from './config/db';

dotenv.config();

connectDB();

const app = express();

export default app;
