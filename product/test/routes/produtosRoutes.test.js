import {
  afterEach, beforeEach, describe, expect, it,
} from '@jest/globals';
import request from 'supertest';
import app from '../../src/main.js';

let server;
beforeEach(() => {
  const port = 40011;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /api/products', () => {
  it('Deve retornar uma lista de produtos', async () => {
    const resposta = await request(app)
      .get('/api/products')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].slug).toEqual('notebook-samsung');
  });
});

let idResposta;
describe('POST em /api/admin/products', () => {
  it('Deve adicionar um novo produto', async () => {
    const resposta = await request(app)
      .post('/api/admin/products')
      .send({
        produto: 'produto Jest',
        descricao: 'descricao jest',
        slug: 'produto-do-jest',
        precoUnitario: 199.99,
        quantidadeEmEstoque: 5,
        categoria: {
          nome: 'categoriaJest',
          id: '63f8d13ab20c07510aeb6d8b',
        },
      })
      .expect(201);

    // eslint-disable-next-line no-underscore-dangle
    idResposta = resposta.body._id;
  });
});

describe('GET em /api/products/id', () => {
  it('Deve retornar detalhes de um produto específico', async () => {
    await request(app)
      .get(`/api/products/${idResposta}`)
      .expect(200);
  });
});

describe('PUT em /api/admin/products/id', () => {
  it('Deve alterar um produto', async () => {
    await request(app)
      .put(`/api/admin/products/${idResposta}`)
      .send({
        produto: 'modificado Jest',
        descricao: 'modificado jest',
        slug: 'produto-do-jest-modificado',
        precoUnitario: 250.10,
        quantidadeEmEstoque: 4,
        categoria: {
          nome: 'categoriaJest',
          id: '63f8d13ab20c07510aeb6d8b',
        },
      })
      .expect(204);
  });
});

describe('DELETE em /api/admin/products/id', () => {
  it('Deve deletar um produto', async () => {
    await request(app)
      .delete(`/api/admin/categories/${idResposta}`)
      .expect(204);
  });
});
