import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const {
  DB_HOST: HOST,
  DB_USER: USER,
  DB_PASSWORD: PASSWORD,
  DB_DATABASE: DATABASE,
  DB_PORT,
} = process.env;

mongoose.connect(`mongodb://${USER}:${PASSWORD}@${HOST}:${DB_PORT}/${DATABASE}?authSource=admin`);
const db = mongoose.connection;

export default db;
