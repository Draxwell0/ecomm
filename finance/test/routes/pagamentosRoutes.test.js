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

describe('GET em /api/payments/id', () => {
  it('Deve retornar detalhes de um pagamento', async () => {
    await request(app)
      .get('/api/payments/1')
      .expect(200);
  });
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
      .expect(201);

    idResposta = resposta.body.id;
  });
});

describe('PATCH EM /api/payments/id', () => {
  it('Deve confirmar ou cancelar um pagamento', async () => {
    await request(app)
      .patch(`/api/payments/${idResposta}`)
      .query({ status: 'confirm' }) // teste sendo feito confirmando o pagamento
      .send({
        nome: 'novo nome',
        cpf: '12345678901',
        endereco: {
          rua: 'rua teste',
          numero: '3123',
          complemento: 'S/N',
          cep: '12345678',
          cidade: 'cidadeTEste',
          estado: 'SP',
        },
        itens: [
          {
            nome: 'Computador',
            quantidade: '2',
            precoEfetivo: '250.99',
          }, {
            nome: 'Celular novo',
            quantidade: '1',
            precoEfetivo: '100.80',
          },
        ],
      })
      .expect(200);
  });
});
