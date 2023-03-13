import express from 'express';
import UsuariosController from '../controllers/usuariosController.js';
import middlewaresAutenticacao from '../utils/middlewaresAutenticacao.js';

const router = express.Router();

router
  .get('/api/admin/users', middlewaresAutenticacao.bearer, UsuariosController.listarUsuarios)
  .get('/api/users/:id', UsuariosController.ListarUsuarioPorId)
  .post('/api/users/logout', middlewaresAutenticacao.bearer, UsuariosController.logoutUsuario)
  .post('/api/users/login', middlewaresAutenticacao.local, UsuariosController.loginUsuario)
  .post('/api/users', UsuariosController.inserirUsuario)
  .put('/api/admin/users/:id', middlewaresAutenticacao.bearer, UsuariosController.alterarUsuario)
  .delete('/api/admin/users/:id', middlewaresAutenticacao.bearer, UsuariosController.removerUsuario);

export default router;
