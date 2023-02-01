import express from 'express'
import CategoriaController from '../controllers/categoriaController.js'

const router = express.Router()

router
    .get('/api/categorias', CategoriaController.listarCategorias)
    .get('/api/categorias/:id', CategoriaController.listarCategoriaPorId)
    .post('/api/categorias', CategoriaController.inserirCategoria)

export default router