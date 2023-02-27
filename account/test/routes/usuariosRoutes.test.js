import {
  afterEach, beforeEach, describe, it,
} from '@jest/globals';
import request from 'supertest';
import app from '../../src/main.js';

let server;
beforeEach(() => {
  const port = 3002;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /api/users', () => {
  it('Deve retornar uma lista de usuários', async () => {
    await request(app)
      .get('/api/users')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });
});

let idResposta;
describe('POST em /api/admin/users', () => {
  it('Deve adicionar um novo usuário', async () => {
    const resposta = await request(app)
      .post('/api/admin/users')
      .send({
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
      })
      .expect(201);

    // eslint-disable-next-line no-underscore-dangle
    idResposta = resposta.body._id;
  });
});

describe('GET em /api/users/id', () => {
  it('Deve retornar detalhes de um usuário específico', async () => {
    await request(app)
      .get(`/api/users/${idResposta}`)
      .expect(200);
  });
});

describe('PUT em /api/admin/users/id', () => {
  it('Deve alterar um usuário', async () => {
    await request(app)
      .put(`/api/admin/users/${idResposta}`)
      .send({
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
      })
      .expect(204);
  });
});

describe('DELETE em /api/admin/users/id', () => {
  it('Deve deletar um usuário', async () => {
    await request(app)
      .delete(`/api/admin/users/${idResposta}`)
      .expect(204);
  });
});
