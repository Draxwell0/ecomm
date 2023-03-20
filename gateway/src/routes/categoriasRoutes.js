import express from 'express';
import passport from 'passport';
import { productsServiceProxy } from './index.js';

const bearerAuth = passport.authenticate('bearer', { session: false });

const categoriesRouter = express.Router();

categoriesRouter
  .get('/api/categories', productsServiceProxy)
  .get('/api/categories/:id', productsServiceProxy)
  .post('/api/admin/categories', bearerAuth, productsServiceProxy)
  .put('/api/admin/categories/:id', bearerAuth, productsServiceProxy)
  .delete('/api/admin/categories/:id', bearerAuth, productsServiceProxy)
  .patch('/api/admin/categories/:id', bearerAuth, productsServiceProxy);

export default categoriesRouter;
