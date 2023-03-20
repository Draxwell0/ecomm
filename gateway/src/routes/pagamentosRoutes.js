import express from 'express';
import passport from 'passport';
import { financeServiceProxy } from './index.js';

const bearerAuth = passport.authenticate('bearer', { session: false });

const financeRouter = express.Router();

financeRouter
  .get('/api/payments/:id', bearerAuth, financeServiceProxy)
  .post('/api/payments', bearerAuth, financeServiceProxy)
  .patch('/api/payments/:id', bearerAuth, financeServiceProxy);

export default financeRouter;
