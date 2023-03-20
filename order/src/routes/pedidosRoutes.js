import express from 'express';
import passport from 'passport';
import PedidoController from '../controllers/pedidoController.js';

const router = express.Router();

router
  .post('/api/orders', passport.authenticate('bearer', { session: false }), PedidoController.inserirPedido)
  .patch('/api/orders/:idPedido', passport.authenticate('bearer', { session: false }), PedidoController.confirmarPedido);

export default router;
