import express from 'express';
import UsuariosController from '../controllers/usuariosController.js';
import middlewaresAutenticacao from '../utils/middlewaresAutenticacao.js';

const router = express.Router();

router
  .get('/api/admin/users', UsuariosController.listarUsuarios)
  .get('/api/users/:id', UsuariosController.listarUsuarioPorId)
  .post('/api/users/logout', UsuariosController.logoutUsuario)
  .post('/api/users/login', middlewaresAutenticacao.local, UsuariosController.loginUsuario)
  .post('/api/users', UsuariosController.inserirUsuario)
  .put('/api/admin/users/:id', UsuariosController.alterarUsuario)
  .delete('/api/admin/users/:id', UsuariosController.removerUsuario);

export default router;
