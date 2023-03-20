import express from 'express';
import passport from 'passport';
import CategoriaController from '../controllers/categoriaController.js';

const router = express.Router();

router
  .get('/api/categories', CategoriaController.listarCategorias)
  .get('/api/categories/:id', CategoriaController.listarCategoriaPorId)
  .post('/api/admin/categories', passport.authenticate('bearer', { session: false }), CategoriaController.inserirCategoria)
  .put('/api/admin/categories/:id', passport.authenticate('bearer', { session: false }), CategoriaController.alterarCategoria)
  .delete('/api/admin/categories/:id', passport.authenticate('bearer', { session: false }), CategoriaController.removerCategoria)
  .patch('/api/admin/categories/:id', passport.authenticate('bearer', { session: false }), CategoriaController.ativarCategoria);

export default router;
