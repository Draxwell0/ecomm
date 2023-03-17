/* eslint-disable no-underscore-dangle */
/* eslint-disable no-useless-escape */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import blacklist from '../../redis/manipulaBlacklist.js';
import Usuarios from '../models/Usuario.js';

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
    const usuario = new Usuarios(req.body);
    const regexSenha = /^(?=.*[A-z])(?=.*\d)(?=.*['"!@#$%¨&*()\-_=+´`~^;:\/.,<>{|}\\])[A-z\d'"!@#$%¨&*()\-_=+´`~^;:\/.,<>{|}\\]{8,255}$/;
    const uf = {
      AC: 'ac', AL: 'al', AM: 'am', AP: 'ap', BA: 'ba', CE: 'ce', DF: 'df', ES: 'es', GO: 'go', MA: 'ma', MG: 'mg', MS: 'ms', MT: 'mt', PA: 'pa', PB: 'pb', PE: 'pe', PI: 'pi', PR: 'pr', RJ: 'rj', RN: 'rn', RO: 'ro', RR: 'rr', RS: 'rs', SC: 'sc', SE: 'se', SP: 'sp', TO: 'to',
    };

    if (uf[usuario.endereco.estado.toUpperCase()] && regexSenha.test(usuario.senha)) {
      usuario.senha = await criaHash(usuario.senha);

      usuario.save((err) => {
        if (err) {
          return res.status(400).send({ message: 'Dados inválidos, verifique a procedência das informações' });
        }
        return res.status(201).send(usuario.toJSON());
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

  static ListarUsuarioPorId = (req, res) => {
    const { id } = req.params;

    Usuarios.findById(id, (err, elm) => {
      if (err) return res.status(404).send({ message: `${err} - o id inserido não existe` });
      return res.status(200).send(elm);
    });
  };

  static alterarUsuario = (req, res) => {
    const { id } = req.params;
    const usuario = new Usuarios(req.body);

    const regexEmail = /^[A-z0-9'"!@#$%¨&*()\-_=+´`~^;:/.,<>{|}\\]+@[A-z0-9](?:[A-z0-9-]{0,255}[A-z0-9])?(?:\.[A-z0-9](?:[A-z0-9-]{0,255}[A-z0-9])?)*$/;
    const regexSenha = /^(?=.*[A-z])(?=.*\d)(?=.*['"!@#$%¨&*()\-_=+´`~^;:\/.,<>{|}\\])[A-z\d'"!@#$%¨&*()\-_=+´`~^;:\/.,<>{|}\\]{8,255}$/;
    const regexCpf = /^\d{11}$/;
    const regexTelefone = /^\d{10,13}$/;
    const regexCep = /^\d{8}$/;
    const uf = {
      AC: 'ac', AL: 'al', AM: 'am', AP: 'ap', BA: 'ba', CE: 'ce', DF: 'df', ES: 'es', GO: 'go', MA: 'ma', MG: 'mg', MS: 'ms', MT: 'mt', PA: 'pa', PB: 'pb', PE: 'pe', PI: 'pi', PR: 'pr', RJ: 'rj', RN: 'rn', RO: 'ro', RR: 'rr', RS: 'rs', SC: 'sc', SE: 'se', SP: 'sp', TO: 'to',
    };

    Usuarios.findById(id, (err) => {
      if (err) return res.status(404).send({ message: `${err} - o id inserido não existe` });
      if (
        usuario.nome
        && usuario.endereco.rua
        && usuario.endereco.numero
        && usuario.endereco.cidade
        && regexEmail.test(usuario.email)
        && regexSenha.test(usuario.senha)
        && regexCpf.test(usuario.cpf)
        && regexTelefone.test(usuario.telefone)
        && regexCep.test(usuario.endereco.cep)
        && uf[usuario.endereco.estado.toUpperCase()]
      ) {
        Usuarios.findByIdAndUpdate(id, { $set: req.body }, (err) => {
          if (err) return res.status(404).send('Usuário não encontrado');
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
