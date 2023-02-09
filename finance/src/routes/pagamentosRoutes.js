const express = require('express')
const PagamentoController = require('../controllers/pagamentoController.js')
const router = express.Router()

router
    .get('/payments/:id', PagamentoController.listarPagamentoPorId)
    .post('/payments', PagamentoController.inserirPagamento)


module.exports = router