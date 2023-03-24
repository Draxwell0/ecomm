import express from 'express';
import PedidoController from '../controllers/pedidoController.js';

const router = express.Router();

router
  .post('/api/orders', PedidoController.inserirPedido)
  .patch('/api/orders/:idPedido', PedidoController.confirmarPedido);

export default router;
