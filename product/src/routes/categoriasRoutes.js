import express from 'express'
import CategoriaController from '../controllers/categoriaController.js'

const router = express.Router()

router
    .get('/api/categorias', CategoriaController.listarCategorias)
    .get('/api/categorias/:id', CategoriaController.listarCategoriaPorId)
    .post('/api/categorias', CategoriaController.inserirCategoria)
    .put('/api/categorias/:id', CategoriaController.alterarCategoria)
    .delete('/api/categorias/:id', CategoriaController.removerCategoria)
    .patch('/api/categorias/:id', CategoriaController.ativarCategoria)

export default router