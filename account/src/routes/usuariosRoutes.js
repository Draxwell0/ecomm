import express from 'express'
import UsuariosController from '../controllers/usuariosController.js'
const router = express.Router()

router
    .get('/api/usuarios', UsuariosController.listarUsuarios)
    .get('/api/usuarios/:id', UsuariosController.ListarUsuarioPorId)
    .post('/api/usuarios', UsuariosController.inserirUsuario)
    .put('/api/usuarios/:id', UsuariosController.alterarUsuario)
    .delete('/api/usuarios/:id', UsuariosController.removerUsuario)

export default router