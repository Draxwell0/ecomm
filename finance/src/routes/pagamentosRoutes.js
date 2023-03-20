const express = require('express');
const passport = require('passport');
const PagamentoController = require('../controllers/pagamentoController.js');

const router = express.Router();

router
  .get('/api/payments/:id', passport.authenticate('bearer', { session: false }), PagamentoController.listarPagamentoPorId)
  .post('/api/payments', passport.authenticate('bearer', { session: false }), PagamentoController.inserirPagamento)
  .patch('/api/payments/:id', passport.authenticate('bearer', { session: false }), PagamentoController.respostaPagamento);

module.exports = router;
