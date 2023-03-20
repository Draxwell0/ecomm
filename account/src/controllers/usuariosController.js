/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import blacklist from '../../redis/manipulaBlacklist.js';
import Usuarios from '../models/Usuario.js';
import usuariosService from '../services/usuariosService.js';

function criaHash(senha) {
  return bcrypt.hash(senha, 12);
}

function criaTokenJWT(usuario) {
  const payload = {
    id: usuario._id,
  };

  const token = jwt.sign(payload, `${process.env.CHAVE_JWT}`, { expiresIn: '30m' });
  return token;
}

class UsuariosController {
  static listarUsuarios = (req, res) => {
    Usuarios.find((err, usuarios) => {
      if (err) return res.status(500).send({ message: `${err.message} - Houve um erro ao listas os usuários` });
      return res.status(200).json(usuarios);
    });
  };

  static inserirUsuario = async (req, res) => {
    const Usuario = new Usuarios(req.body);

    if (usuariosService.validaInsercao(Usuario)) {
      Usuario.senha = await criaHash(Usuario.senha);

      Usuario.save((err) => {
        if (err) {
          return res.status(400).send({ message: 'Dados inválidos, verifique a procedência das informações' });
        }
        return res.status(201).send(Usuario.toJSON());
      });
    } else {
      return res.status(400).send({ message: 'Dados inválidos, verifique a procedência das informações' });
    }
  };

  static loginUsuario = (req, res) => {
    const token = criaTokenJWT(req.usuario);
    res.set('Authorization', token);
    res.status(204).send();
  };

  static logoutUsuario = async (req, res) => {
    try {
      const { token } = req;
      await blacklist.adiciona(token);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  };

  static listarUsuarioPorId = (req, res) => {
    const { id } = req.params;

    Usuarios.findById(id, (err, elm) => {
      if (err) return res.status(404).send({ message: `${err} - o id inserido não existe` });
      return res.status(200).send(elm);
    });
  };

  static alterarUsuario = (req, res) => {
    const { id } = req.params;
    const Usuario = new Usuarios(req.body);

    Usuarios.findById(id, (err) => {
      if (err) return res.status(404).send({ message: `${err} - o id inserido não existe` });
      if (usuariosService.validaAlteracao(Usuario)) {
        Usuarios.findByIdAndUpdate(id, { $set: req.body }, (erro) => {
          if (erro) return res.status(400).send('Usuário não existe ou dados não coincidem');
          return res.status(200).send({ message: 'Usuário atualizado com sucesso' });
        });
      } else {
        return res.status(400).send({ message: 'Dados inválidos, verifique a procedência das informações' });
      }
    });
  };

  static removerUsuario = (req, res) => {
    const { id } = req.params;

    Usuarios.findByIdAndDelete(id, (err) => {
      if (err) return res.status(404).send({ message: 'Usuário não encontrado' });
      return res.status(200).send({ message: 'Usuário removido com sucesso' });
    });
  };
}

export default UsuariosController;
