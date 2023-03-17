require('dotenv').config();

const {
  DB_HOST: HOST,
  DB_USER: USER,
  DB_PASSWORD: PASSWORD,
  DB_DATABASE: DATABASE,
} = process.env;

module.exports = {
  development: {
    username: USER,
    password: PASSWORD,
    database: DATABASE,
    host: HOST,
    dialect: 'mysql',
  },
  test: {
    username: USER,
    password: PASSWORD,
    database: DATABASE,
    host: 'localhost',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
