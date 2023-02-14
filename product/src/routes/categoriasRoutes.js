import express from 'express'
import CategoriaController from '../controllers/categoriaController.js'

const router = express.Router()

router
    .get('/api/categories', CategoriaController.listarCategorias)
    .get('/api/categories/:id', CategoriaController.listarCategoriaPorId)
    .post('/api/admin/categories', CategoriaController.inserirCategoria)
    .put('/api/admin/categories/:id', CategoriaController.alterarCategoria)
    .delete('/api/admin/categories/:id', CategoriaController.removerCategoria)
    .patch('/api/admin/categories/:id', CategoriaController.ativarCategoria)

export default router