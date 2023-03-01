const {
  afterEach, beforeEach, describe, it,
} = require('@jest/globals');
const request = require('supertest');
const app = require('../../src/main.js');

let server;
beforeEach(() => {
  const port = 3003;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

let idResposta;
describe('POST em /api/payments', () => {
  it('Deve criar um novo pagamento', async () => {
    const resposta = await request(app)
      .post('/api/payments')
      .send({
        valor: '10.50',
        nome: 'nomeJest',
        numeroCartao: '1234567890123456',
        dataExpiracao: '2025-10',
        cvv: '123',
      })
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(201);

    idResposta = resposta.body.id;
  });
});

describe('GET em /api/payments/id', () => {
  it('Deve retornar detalhes de um pagamento', async () => {
    await request(app)
      .get(`/api/payments/${idResposta}`)
      .expect('content-type', /json/)
      .expect(200);
  });
});

describe('PATCH EM /api/payments/id', () => {
  it('Deve confirmar ou cancelar um pagamento', async () => {
    await request(app)
      .patch(`/api/payments/${idResposta}`)
      .query({ status: 'cancel' }) // teste sendo feito cancelando o pagamento
      .expect('content-type', /json/)
      .expect(200);
  });
});
