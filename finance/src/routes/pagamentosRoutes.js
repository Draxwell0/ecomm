const express = require('express');
const PagamentoController = require('../controllers/pagamentoController.js');

const router = express.Router();

router
  .get('/api/payments/:id', PagamentoController.listarPagamentoPorId)
  .post('/api/payments', PagamentoController.inserirPagamento)
  .patch('/api/payments/:id', PagamentoController.respostaPagamento);

module.exports = router;
