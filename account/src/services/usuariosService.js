/* eslint-disable no-useless-escape */
const regexEmail = /^[A-z0-9'"!@#$%¨&*()\-_=+´`~^;:/.,<>{|}\\]+@[A-z0-9](?:[A-z0-9-]{0,255}[A-z0-9])?(?:\.[A-z0-9](?:[A-z0-9-]{0,255}[A-z0-9])?)*$/;
const regexSenha = /^(?=.*[A-z])(?=.*\d)(?=.*['"!@#$%¨&*()\-_=+´`~^;:\/.,<>{|}\\])[A-z\d'"!@#$%¨&*()\-_=+´`~^;:\/.,<>{|}\\]{8,255}$/;
const regexCpf = /^\d{11}$/;
const regexTelefone = /^\d{10,13}$/;
const regexCep = /^\d{8}$/;
const uf = {
  AC: 'ac', AL: 'al', AM: 'am', AP: 'ap', BA: 'ba', CE: 'ce', DF: 'df', ES: 'es', GO: 'go', MA: 'ma', MG: 'mg', MS: 'ms', MT: 'mt', PA: 'pa', PB: 'pb', PE: 'pe', PI: 'pi', PR: 'pr', RJ: 'rj', RN: 'rn', RO: 'ro', RR: 'rr', RS: 'rs', SC: 'sc', SE: 'se', SP: 'sp', TO: 'to',
};

export default {
  validaInsercao: (usuario) => {
    if (
      usuario.nome.trim()
      && uf[usuario.endereco.estado.toUpperCase()]
      && regexSenha.test(usuario.senha)
    ) return true;
    return false;
  },

  validaAlteracao: (usuario) => {
    if (
      usuario.nome.trim()
      && usuario.endereco.rua
      && usuario.endereco.numero
      && usuario.endereco.cidade
      && regexEmail.test(usuario.email)
      && regexSenha.test(usuario.senha)
      && regexCpf.test(usuario.cpf)
      && regexTelefone.test(usuario.telefone)
      && regexCep.test(usuario.endereco.cep)
      && uf[usuario.endereco.estado.toUpperCase()]
    ) return true;
    return false;
  },
};
