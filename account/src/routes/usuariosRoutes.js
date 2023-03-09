import express from 'express';
import UsuariosController from '../controllers/usuariosController.js';
import middlewaresAutenticacao from '../utils/middlewaresAutenticacao.js';

const router = express.Router();

router
  .get('/api/users', UsuariosController.listarUsuarios)
  .get('/api/users/:id', UsuariosController.ListarUsuarioPorId)
  .post('/api/users/login', middlewaresAutenticacao.local, UsuariosController.loginUsuario)
  .post('/api/admin/users', UsuariosController.inserirUsuario)
  .put('/api/admin/users/:id', UsuariosController.alterarUsuario)
  .delete('/api/admin/users/:id', UsuariosController.removerUsuario);

export default router;
