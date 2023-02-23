/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import Usuarios from '../models/Usuario.js';

class UsuariosController {
  static listarUsuarios = (req, res) => {
    Usuarios.find((err, usuarios) => {
      if (err) return res.status(500).send({ message: `${err.message} - Houve um erro ao listas os usuários` });
      return res.status(200).json(usuarios);
    });
  };

  static inserirUsuario = (req, res) => {
    const usuario = new Usuarios(req.body);
    const uf = {
      AC: 'ac', AL: 'al', AM: 'am', AP: 'ap', BA: 'ba', CE: 'ce', DF: 'df', ES: 'es', GO: 'go', MA: 'ma', MG: 'mg', MS: 'ms', MT: 'mt', PA: 'pa', PB: 'pb', PE: 'pe', PI: 'pi', PR: 'pr', RJ: 'rj', RN: 'rn', RO: 'ro', RR: 'rr', RS: 'rs', SC: 'sc', SE: 'se', SP: 'sp', TO: 'to',
    };

    if (uf[usuario.endereco.estado.toUpperCase()]) {
      usuario.save((err) => {
        if (err) return res.status(400).send({ message: 'Dados inválidos, verifique a procedência das informações' });
        return res.status(201).send(usuario.toJSON());
      });
    } else {
      return res.status(400).send({ message: 'Dados inválidos, verifique a procedência das informações' });
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
    const regexSenha = /^(?=.*[A-z])(?=.*\d)(?=.*['"!@#$%¨&*()\-_=+´`~^;:/.,<>{|}\\])[A-z\d'"!@#$%¨&*()\-_=+´`~^;:/.,<>{|}\\]{8,255}$/;
    const regexCpf = /^\d{11}$/;
    const regexTelefone = /^\d{10,13}$/;
    const regexCep = /^\d{8}$/;
    const uf = {
      AC: 'ac', AL: 'al', AM: 'am', AP: 'ap', BA: 'ba', CE: 'ce', DF: 'df', ES: 'es', GO: 'go', MA: 'ma', MG: 'mg', MS: 'ms', MT: 'mt', PA: 'pa', PB: 'pb', PE: 'pe', PI: 'pi', PR: 'pr', RJ: 'rj', RN: 'rn', RO: 'ro', RR: 'rr', RS: 'rs', SC: 'sc', SE: 'se', SP: 'sp', TO: 'to',
    };

    usuario.findById(id, (err) => {
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
        usuario.findByIdAndUpdate(id, { $set: req.body }, (err) => {
          if (err) return res.status(404).send('Usuário não encontrado');
          return res.status(204).send('Usuário atualizado com sucesso');
        });
      } else {
        return res.status(400).send({ message: 'Dados inválidos, verifique a procedência das informações' });
      }
    });
  };

  static removerUsuario = (req, res) => {
    const { id } = req.params;

    Usuarios.findByIdAndDelete(id, (err) => {
      if (err) return res.status(404).send('Usuário não encontrado');
      return res.status(204).send('Usuário removido com sucesso');
    });
  };
}

export default UsuariosController;
