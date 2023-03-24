import express from 'express';
import passport from 'passport';
import { productsServiceProxy } from './index.js';

const bearerAuth = passport.authenticate('bearer', { session: false });

const productsRouter = express.Router();

productsRouter
  .get('/api/products', productsServiceProxy)
  .get('/api/products/:id', productsServiceProxy)
  .post('/api/admin/products', bearerAuth, productsServiceProxy)
  .put('/api/admin/products/:id', bearerAuth, productsServiceProxy)
  .delete('/api/admin/products/:id', bearerAuth, productsServiceProxy);

export default productsRouter;
