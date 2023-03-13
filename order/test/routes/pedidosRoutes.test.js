import {
  describe, it, beforeAll, afterAll,
} from '@jest/globals';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/main.js';

beforeAll(async () => {
  mongoose.connect('mongodb://admin:secret@127.0.0.1:27017/ecomm-order-test?authSource=admin');
});

afterAll(async () => {
  mongoose.connection.close();
});

const moldePedido = {
  idCliente: '63fcd11f007767f013ee5b3b', // id de cliente existente
  enderecoEntrega: {
    rua: 'rua jest',
    numero: '123',
    complemento: 'S/N',
    cep: '3242343243',
    cidade: 'cidade jest',
    estado: 'SP',
  },
  itens: [
    {
      id: '63e933c726d6badacc49181a', // id de produto existente
      quantidade: '2',
      desconto: '400',
      precoUnitario: '8549.1',
    }, {
      id: '63e933c726d6badacc491815', // id de produto existente
      quantidade: '2',
      desconto: '350',
      precoUnitario: '9176.00',
    },
  ],
};

let idResposta;
describe('POST em /api/orders', () => {
  it('Deve adicionar um novo pedido', async () => {
    const resposta = await request(app)
      .post('/api/orders')
      .send(moldePedido)
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(201);

    // eslint-disable-next-line no-underscore-dangle
    idResposta = resposta.body._id;
  });

  it('Não deve adicionar quando vier com campos vazios', async () => {
    await request(app)
      .post('/api/orders')
      .send({})
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(400);
  });
});

describe('PATCH em /api/orders/idPedido', () => {
  it('Deve confirmar um pedido', async () => {
    await request(app)
      .patch(`/api/orders/${idResposta}`)
      .send({
        idPagamento: 9, // id de pagamento existente
      })
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
  });
});
