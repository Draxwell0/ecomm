/* eslint-disable import/no-useless-path-segments */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import express from 'express';
// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import routes from './routes/index.js';

import '../src/utils/estrategiasAutenticacao.js';

const app = express();
app.use(express.json());
routes(app);

export default app;
