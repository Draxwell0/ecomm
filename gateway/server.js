/* eslint-disable no-console */
import dotenv from 'dotenv';
import app from './src/main.js';

dotenv.config();

const { PORT } = process.env;
app.listen(PORT, () => { console.log('Servidor escutando na porta ', PORT); });
