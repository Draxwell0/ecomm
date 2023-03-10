const express = require('express');
const routes = require('./routes/index.js');

require('./utils/estrategiasAutenticacao.js');

const app = express();
app.use(express.json());
routes(app);

module.exports = app;
