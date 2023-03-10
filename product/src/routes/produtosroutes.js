import express from 'express';
import passport from 'passport';
import ProdutosController from '../controllers/produtosController.js';

const router = express.Router();

router
  .get('/api/products', ProdutosController.listarProdutos)
  .get('/api/products/:id', ProdutosController.listarProdutoPorId)
  .post('/api/admin/products', passport.authenticate('bearer', { session: false }), ProdutosController.inserirProduto)
  .put('/api/admin/products/:id', passport.authenticate('bearer', { session: false }), ProdutosController.alterarProduto)
  .delete('/api/admin/products/:id', passport.authenticate('bearer', { session: false }), ProdutosController.removerProduto);

export default router;
