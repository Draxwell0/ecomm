import express from 'express'
import ProdutosController from '../controllers/produtosController.js'

const router = express.Router()

router
    .get('/api/produtos', ProdutosController.listarProdutos)
    .get('/api/produtos/:id', ProdutosController.listarProdutoPorId)
    .post('/api/produtos', ProdutosController.inserirProduto)
    .put('/api/produtos/:id', ProdutosController.alterarProduto)
    .delete('/api/produtos/:id', ProdutosController.removerProduto)

export default router