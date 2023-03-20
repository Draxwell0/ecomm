/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import Pedidos from '../models/Pedido.js';

dotenv.config();

class PedidoController {
  static inserirPedido = (req, res) => {
    const pedido = new Pedidos(req.body);

    try {
      pedido.save((err) => {
        if (err) return res.status(400).send({ message: 'Dados inválidos, verifique a procedência das informações' });

        return res.status(201).send(pedido.toJSON());
      });
    } catch (err) {
      return res.status(400).send({ message: 'Dados inválidos, verifique a procedência das informações' });
    }
  };

  static confirmarPedido = (req, res) => {
    const { idPedido } = req.params;
    const { idPagamento } = req.body;

    try {
      Pedidos.findByIdAndUpdate(idPedido, { $set: { status: 'pago' } }, (err) => {
        if (err) return res.status(404).send({ message: 'O pedido inserido não existe' });
        return res.status(200).send({ message: 'Pedido pago' });
      });

      Pedidos.findById(idPedido, async (err, pedido) => {
        if (!err) {
          // obter o nome, CPF e endereço completo do cliente
          const cliente = await fetch(`http://gateway:${process.env.GATEWAY_PORT}/api/users/${pedido.idCliente}`);
          const { nome, cpf, endereco } = await cliente.json();

          // obter o nome dos produtos, se necessário
          // eslint-disable-next-line no-unused-vars
          const nomesProdutos = await Promise.all(
            pedido.itens.map(async (elm) => {
              let produto = await fetch(`http://gateway:${process.env.GATEWAY_PORT}/api/products/${elm.id}`);
              produto = await produto.json();
              return produto.produto; // model.produto = nome do produto
            }),
          );

          // confirmar o pagamento passando todas as informações para a geração da nota fiscal
          await fetch(`http://gateway:${process.env.GATEWAY_PORT}/api/payments/${idPagamento}?status=confirm`, {
            method: 'PATCH',
            body: JSON.stringify({
              nome, cpf, endereco, itens: pedido.itens,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
          });
        }
      });
    } catch (err) {
      return res.status(404).send({ message: err.message });
    }
  };
}

export default PedidoController;
