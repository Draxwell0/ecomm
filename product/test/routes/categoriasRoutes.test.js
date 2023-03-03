import {
  describe, expect, it, jest, test, beforeAll, afterAll,
} from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/main.js';

beforeAll(async () => {
  await mongoose.connect('mongodb://admin:secret@127.0.0.1:27017/ecomm-product-test?authSource=admin');
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET em /api/categories', () => {
  it('Dever retornar uma lista de categorias', async () => {
    await request(app)
      .get('/api/categories')
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
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(201);

    // eslint-disable-next-line no-underscore-dangle
    idResposta = resposta.body._id;
  });

  test.each([
    ['com campos vazios', {}],
    ['com nome inválido', { nome: 'nome com espaco' }],
  ])('Não deve adicionar quando vier %s', async (chave, param) => {
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
      .expect('content-type', /json/)
      .expect(200);
  });

  it('Deve retornar erro com id inexistente', async () => {
    await request(app)
      .get('/api/categories/12345678901234567890123')
      .expect('content-type', /json/)
      .expect(404);
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
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });

  test.each([
    ['com campos vazios', {}],
    ['com nome inválido', { nome: 'nome com espaco' }],
  ])('Não deve alterar quando vier %s', async (chave, param) => {
    await request(app)
      .post('/api/admin/categories')
      .send(param)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(400);
  });

  it('Deve retornar erro com id inexistente', async () => {
    await request(app)
      .put('/api/admin/categories/12345678901234567890123')
      .expect('content-type', /json/)
      .expect(404);
  });
});

describe('PATCH em /api/admin/categories/id', () => {
  it('Deve ativar uma categoria', async () => {
    await request(app)
      .patch(`/api/admin/categories/${idResposta}`)
      .expect('content-type', /json/)
      .expect(200);
  });

  it('Deve retornar erro com id inexistente', async () => {
    await request(app)
      .patch('/api/admin/categories/12345678901234567890123')
      .expect('content-type', /json/)
      .expect(404);
  });
});

describe('DELETE em /api/admin/categories/id', () => {
  it('Deve deletar uma categoria', async () => {
    await request(app)
      .delete(`/api/admin/categories/${idResposta}`)
      .expect('content-type', /json/)
      .expect(200);
  });

  it('Deve retornar erro com id inexistente', async () => {
    await request(app)
      .delete('/api/admin/categories/12345678901234567890123')
      .expect('content-type', /json/)
      .expect(404);
  });
});
