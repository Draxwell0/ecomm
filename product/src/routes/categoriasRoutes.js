import express from 'express'
import CategoriaController from '../controllers/categoriaController.js'

const router = express.Router()

router
    .get('/api/categorias', CategoriaController.listarCategorias)

export default router