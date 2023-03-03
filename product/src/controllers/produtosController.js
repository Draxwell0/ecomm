/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
import Produtos from '../models/Produto.js';

class ProdutosController {
  static listarProdutos = (req, res) => {
    Produtos.find((err, produto) => {
      if (err) return res.status(500).send({ message: `${err.message} - Houve um erro ao listas os produtos` });
      return res.status(200).json(produto);
    });
  };

  static inserirProduto = (req, res) => {
    const produto = new Produtos(req.body);

    try {
      produto.save((err) => {
        if (err) return res.status(400).send({ message: ` ${err.message} - Houve um erro ao inserir o produto` });
        return res.status(201).send(produto.toJSON());
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
    const produto = new Produtos(req.body);
    const regexNome = /^[A-z][\sA-z0-9]{3,}$/;
    const regexSlug = /^[A-z0-9-]+$/;

    Produtos.findById(id, (err) => {
      if (err) return res.status(404).send({ message: `${err.message} - o id inserido não existe` });
      try {
        if (err) throw new Error(err);
        if (
          regexNome.test(produto.produto) // model.produto = nome do produto
            && regexSlug.test(produto.slug)
            && produto.precoUnitario > 0
            && produto.quantidadeEmEstoque > 0
            && produto.quantidadeEmEstoque < 10000
        ) {
          Produtos.findByIdAndUpdate(id, { $set: req.body }, (err) => {
            if (err) {
              res.status(400).send({ message: `${err.message} - O formato especificado é inválido` });
              res.status(404).send({ message: `${err} - Produto não encontrado` });
            } else {
              return res.status(200).send({ message: 'Produto atualizado com sucesso' });
            }
          });
        } else {
          return res.status(400).send({ message: 'Dados inválidos, verifique a procedência das informações' });
        }
      } catch (err) {
        return res.status(400).send({ message: `${err} - o id da categoria não existe` });
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
