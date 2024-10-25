import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

const db = new Sequelize(
    'postgresql://neondb_owner:D7SG6MZKcYjL@ep-morning-sky-a2nheoeb.eu-central-1.aws.neon.tech/neondb?sslmode=require'
);

export default db;
