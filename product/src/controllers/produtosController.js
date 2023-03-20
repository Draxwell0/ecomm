/* eslint-disable consistent-return */
import Produtos from '../models/Produto.js';
import produtosService from '../services/produtosService.js';

class ProdutosController {
  static listarProdutos = (req, res) => {
    Produtos.find((err, produto) => {
      if (err) return res.status(500).send({ message: `${err.message} - Houve um erro ao listas os produtos` });
      return res.status(200).json(produto);
    });
  };

  static inserirProduto = (req, res) => {
    const Produto = new Produtos(req.body);

    try {
      Produto.save((err) => {
        if (err) return res.status(400).send({ message: ` ${err.message} - Houve um erro ao inserir o produto` });
        return res.status(201).send(Produto.toJSON());
      });
    } catch (err) {
      return res.status(400).send({ message: ` ${err.message} ` });
    }
  };

  static listarProdutoPorId = (req, res) => {
    const { id } = req.params;

    Produtos.findById(id, (err, produto) => {
      if (err || !produto) return res.status(404).send({ message: `${err} - o id inserido não existe` });
      return res.status(200).send(produto);
    });
  };

  static alterarProduto = (req, res) => {
    const { id } = req.params;
    const Produto = new Produtos(req.body);

    Produtos.findById(id, (err) => {
      if (err) return res.status(404).send({ message: `${err.message} - o id inserido não existe` });
      try {
        if (err) throw new Error(err);
        if (produtosService.validaAlteracao(Produto)) {
          Produtos.findByIdAndUpdate(id, { $set: req.body }, (erro) => {
            if (erro) {
              res.status(400).send({ message: `${err.message} - O formato especificado é inválido ou o produto não existe` });
            } else {
              return res.status(200).send({ message: 'Produto atualizado com sucesso' });
            }
          });
        } else {
          return res.status(400).send({ message: 'Dados inválidos, verifique a procedência das informações' });
        }
      } catch (erro) {
        return res.status(400).send({ message: `${erro} - o id da categoria não existe` });
      }
    });
  };

  static removerProduto = (req, res) => {
    const { id } = req.params;

    Produtos.findByIdAndDelete(id, (err) => {
      if (err) return res.status(404).send({ message: 'Produto não encontrado' });
      return res.status(200).send({ message: 'Produto removido com sucesso' });
    });
  };
}

export default ProdutosController;
