import express from 'express'
import CategoriaController from '../controllers/categoriaController.js'

const router = express.Router()

router
    .get('/api/categorias', CategoriaController.listarCategorias)
    .post('/api/categorias', CategoriaController.inserirCategoria)

export default router