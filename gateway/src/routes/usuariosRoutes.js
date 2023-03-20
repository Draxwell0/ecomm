import express from 'express';
import passport from 'passport';
import { accountsServiceProxy } from './index.js';

const bearerAuth = passport.authenticate('bearer', { session: false });

const accountsRouter = express.Router();

accountsRouter
  .get('/api/admin/users', bearerAuth, accountsServiceProxy)
  .get('/api/users/:id', accountsServiceProxy)
  .post('/api/users/logout', bearerAuth, accountsServiceProxy)
  .post('/api/users/login', accountsServiceProxy)
  .post('/api/users', accountsServiceProxy)
  .put('/api/admin/users/:id', bearerAuth, accountsServiceProxy)
  .delete('/api/admin/users/:id', bearerAuth, accountsServiceProxy);

export default accountsRouter;
