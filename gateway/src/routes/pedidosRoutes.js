import express from 'express';
import passport from 'passport';
import { ordersServiceProxy } from './index.js';

const bearerAuth = passport.authenticate('bearer', { session: false });

const ordersRouter = express.Router();

ordersRouter
  .post('/api/orders', bearerAuth, ordersServiceProxy)
  .patch('/api/orders/:idPedido', bearerAuth, ordersServiceProxy);

export default ordersRouter;
