import {
  afterEach, beforeEach, describe, it, test,
} from '@jest/globals';
import request from 'supertest';
import app from '../../src/main.js';

const moldeProduto = {
  produto: 'produto Jest',
  descricao: 'descricao jest',
  slug: 'produto-do-jest', // slug é indice único e retornará erro caso já exista um igual no banco
  precoUnitario: '199.99',
  quantidadeEmEstoque: '5',
  categoria: {
    nome: 'categoriaJest',
    id: '63fe04092c63b668dde7316c', // valido de acordo com uma categoria e id existente no banco
  },
};

const moldeProdutoModificado = {
  produto: 'modificado Jest',
  descricao: 'modificado jest',
  slug: 'produto-do-jest-modificado', // slug é indice único e retornará erro caso já exista um igual no banco
  precoUnitario: 250.10,
  quantidadeEmEstoque: 4,
  categoria: {
    nome: 'categoriaJest',
    id: '63fe04092c63b668dde7316c', // valido de acordo com uma categoria e id existente no banco
  },
};

const casosDeErro = (objeto) => ([
  ['com campos vazios', {}],
  ['com nome inválido', { ...objeto, produto: '!@#$&*' }],
  ['com slug inválido', { ...objeto, slug: 'slug com espaco' }],
  ['com preco invalido', { ...objeto, precoUnitario: 'preco' }],
  ['com quantidade em estoque zerada', { ...objeto, quantidadeEmEstoque: 0 }],
  ['com quantidade em estoque maior que 10000', { ...objeto, quantidadeEmEstoque: 99999 }],
  ['com id de categoria inexistente', { ...objeto, categoria: { ...objeto.categoria, id: 123 } }],
]);

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
    await request(app)
      .get('/api/products')
      .expect('content-type', /json/)
      .expect(200);
  });
});

let idResposta;
describe('POST em /api/admin/products', () => {
  it('Deve adicionar um novo produto', async () => {
    const resposta = await request(app)
      .post('/api/admin/products')
      .send(moldeProduto)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(201);

    // eslint-disable-next-line no-underscore-dangle
    idResposta = resposta.body._id;
  });

  test.each(casosDeErro(moldeProduto))('Não deve adicionar quando vier %s', async (chave, param) => {
    await request(app)
      .post('/api/admin/products')
      .send(param)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(400);
  });
});

describe('GET em /api/products/id', () => {
  it('Deve retornar detalhes de um produto específico', async () => {
    await request(app)
      .get(`/api/products/${idResposta}`)
      .expect('content-type', /json/)
      .expect(200);
  });

  it('Deve retornar erro com id inexistente', async () => {
    await request(app)
      .get('/api/products/12345678901234567890123')
      .expect('content-type', /json/)
      .expect(404);
  });
});

describe('PUT em /api/admin/products/id', () => {
  it('Deve alterar um produto', async () => {
    await request(app)
      .put(`/api/admin/products/${idResposta}`)
      .send(moldeProdutoModificado)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });

  test.each(casosDeErro(moldeProdutoModificado))('Não deve alterar quando vier %s', async (chave, param) => {
    await request(app)
      .put(`/api/admin/products/${idResposta}`)
      .send(param)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(400);
  });

  it('Deve retornar erro com id inexistente', async () => {
    await request(app)
      .put('/api/admin/products/12345678901234567890123')
      .expect('content-type', /json/)
      .expect(404);
  });
});

describe('DELETE em /api/admin/products/id', () => {
  it('Deve deletar um produto', async () => {
    await request(app)
      .delete(`/api/admin/products/${idResposta}`)
      .expect('content-type', /json/)
      .expect(200);
  });

  it('Deve retornar erro com id inexistente', async () => {
    await request(app)
      .delete('/api/admin/products/12345678901234567890123')
      .expect('content-type', /json/)
      .expect(404);
  });
});
