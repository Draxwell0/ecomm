import {
  afterAll,
  beforeAll,
  describe, it, test,
} from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/main.js';

beforeAll(async () => {
  mongoose.connect('mongodb://admin:secret@127.0.0.1:27017/ecomm-account-test?authSource=admin');
});

afterAll(async () => {
  mongoose.connection.close();
});

const moldeUsuario = {
  nome: 'nomeJest',
  email: 'teste@jest.com',
  senha: 'Jest123$%&ABCD',
  cpf: '12345678901',
  telefone: '12345678901',
  endereco: {
    rua: 'rua jest',
    numero: '123',
    complemento: 'S/N',
    cep: '12345678',
    cidade: 'cidadeJest',
    estado: 'SP',
  },
};

const moldeUsuarioModificado = {
  nome: 'nomeJestAlterado',
  email: 'alterado@jest.com',
  senha: 'tseJ321&%$DCBA',
  cpf: '12345678900',
  telefone: '12345678900',
  endereco: {
    rua: 'rua jest alterada',
    numero: '321',
    complemento: 'S/N',
    cep: '12345678',
    cidade: 'cidadeJestNova',
    estado: 'MG',
  },
};

const casosDeErro = (objeto) => ([
  ['com algum campo vazio', { ...objeto, nome: '' }],
  ['com email inválido', { ...objeto, email: 'email@com espaco.com' }],
  ['com senha inválida', { ...objeto, senha: 'senhaSemCaracteresEspeciais123' }],
  ['com cpf inválido', { ...objeto, cpf: '1234567890' }],
  ['com telefone inválido', { ...objeto, telefone: '123456789' }],
  ['com cep inválido', { ...objeto, endereco: { ...objeto.endereco, cep: '12345' } }],
]);

describe('GET em /api/users', () => {
  it('Deve retornar uma lista de usuários', async () => {
    await request(app)
      .get('/api/users')
      .expect('content-type', /json/)
      .expect(200);
  });
});

let idResposta;
describe('POST em /api/admin/users', () => {
  it('Deve adicionar um novo usuário', async () => {
    const resposta = await request(app)
      .post('/api/admin/users')
      .send(moldeUsuario)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(201);

    // eslint-disable-next-line no-underscore-dangle
    idResposta = resposta.body._id;
  });

  test.each(casosDeErro(moldeUsuario))('Não deve adicionar quando vier %s', async (chave, param) => {
    await request(app)
      .post('/api/admin/users')
      .send(param)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(400);
  });
});

describe('GET em /api/users/id', () => {
  it('Deve retornar detalhes de um usuário específico', async () => {
    await request(app)
      .get(`/api/users/${idResposta}`)
      .expect('content-type', /json/)
      .expect(200);
  });

  it('Deve retornar erro com id inexistente', async () => {
    await request(app)
      .get('/api/users/12345678901234567890123')
      .expect('content-type', /json/)
      .expect(404);
  });
});

describe('PUT em /api/admin/users/id', () => {
  it('Deve alterar um usuário', async () => {
    await request(app)
      .put(`/api/admin/users/${idResposta}`)
      .send(moldeUsuarioModificado)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });

  test.each(casosDeErro(moldeUsuarioModificado))('Não deve adicionar quando vier %s', async (chave, param) => {
    await request(app)
      .post('/api/admin/users')
      .send(param)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(400);
  });

  it('Deve retornar erro com id inexistente', async () => {
    await request(app)
      .put('/api/admin/users/12345678901234567890123')
      .expect('content-type', /json/)
      .expect(404);
  });
});

describe('DELETE em /api/admin/users/id', () => {
  it('Deve deletar um usuário', async () => {
    await request(app)
      .delete(`/api/admin/users/${idResposta}`)
      .expect('content-type', /json/)
      .expect(200);
  });

  it('Deve retornar erro com id inexistente', async () => {
    await request(app)
      .delete('/api/admin/users/12345678901234567890123')
      .expect('content-type', /json/)
      .expect(404);
  });
});
