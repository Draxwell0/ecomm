const express = require('express')
const PagamentoController = require('../controllers/pagamentoController.js')
const router = express.Router()

router
    .post('/payments', PagamentoController.inserirPagamento)


module.exports = router