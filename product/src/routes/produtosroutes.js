import express from 'express'
import ProdutosController from '../controllers/produtosController.js'

const router = express.Router()

router
    .get('/api/products', ProdutosController.listarProdutos)
    .get('/api/products/:id', ProdutosController.listarProdutoPorId)
    .post('/api/admin/products', ProdutosController.inserirProduto)
    .put('/api/admin/products/:id', ProdutosController.alterarProduto)
    .delete('/api/admin/products/:id', ProdutosController.removerProduto)

export default router