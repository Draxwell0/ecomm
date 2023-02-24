import {
  afterEach, beforeEach, describe, expect, it, jest, test,
} from '@jest/globals';
import request from 'supertest';
import app from '../../src/main.js';

let server;
beforeEach(() => {
  const port = 4001;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /api/categories', () => {
  it('Dever retornar uma lista de categorias', async () => {
    await request(app)
      .get('/api/categories')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });
});

let idResposta;
describe('POST em /api/admin/categories', () => {
  it('Deve adicionar uma nova categoria', async () => {
    const resposta = await request(app)
      .post('/api/admin/categories')
      .send({
        nome: 'categoriaJest',
        status: 'ativa',
      })
      .expect(201);

    // eslint-disable-next-line no-underscore-dangle
    idResposta = resposta.body._id;
  });

  test.each([
    ['vazio', {}],
    ['com nome inválido', { nome: 'nome com espaco', status: 'ativa' }],
    ['com campos faltando', { nome: 'teste' }],
  ])('Deve recusar a entrada de documento %s', async (chave, param) => {
    const requisicao = { request };
    const spy = jest.spyOn(requisicao, 'request');
    await requisicao.request(app)
      .post('/api/admin/categories')
      .send(param)
      .expect(400);
    expect(spy).toHaveBeenCalled();
  });
});

describe('GET em /api/categories/id', () => {
  it('Deve retornar detalhes de uma categoria específica', async () => {
    await request(app)
      .get(`/api/categories/${idResposta}`)
      .expect(200);
  });
});

describe('PUT em /api/admin/categories/id', () => {
  it('Deve alterar uma categoria', async () => {
    await request(app)
      .put(`/api/admin/categories/${idResposta}`)
      .send({
        nome: 'Alterado',
        status: 'inativa',
      })
      .expect(204);
  });
});

describe('PATCH em /api/admin/categories/id', () => {
  it('Deve ativar uma categoria', async () => {
    await request(app)
      .patch(`/api/admin/categories/${idResposta}`)
      .expect(204);
  });
});

describe('DELETE em /api/admin/categories/id', () => {
  it('Deve deletar uma categoria', async () => {
    await request(app)
      .delete(`/api/admin/categories/${idResposta}`)
      .expect(204);
  });
});
