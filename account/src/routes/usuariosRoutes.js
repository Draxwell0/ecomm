import express from 'express'
import UsuariosController from '../controllers/usuariosController.js'
const router = express.Router()

router
    .get('/api/admin/users', UsuariosController.listarUsuarios)
    .get('/api/admin/users/:id', UsuariosController.ListarUsuarioPorId)
    .post('/api/admin/users', UsuariosController.inserirUsuario)
    .put('/api/admin/users/:id', UsuariosController.alterarUsuario)
    .delete('/api/admin/users/:id', UsuariosController.removerUsuario)

export default router