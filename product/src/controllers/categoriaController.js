/* eslint-disable consistent-return */
import Categorias from '../models/Categoria.js';

class CategoriaController {
  static listarCategorias = (req, res) => {
    Categorias.find((err, categorias) => {
      if (err) return res.status(500).send({ message: `${err.message} - Houve um erro ao listas as categorias` });
      return res.status(200).json(categorias);
    }).select({ nome: 1 });
  };

  static inserirCategoria = (req, res) => {
    const categoria = new Categorias(req.body);

    categoria.save((err) => {
      if (err) return res.status(400).send({ message: `${err.message} - falha ao inserir categoria` });
      return res.status(201).send(categoria.toJSON());
    });
  };

  static listarCategoriaPorId = (req, res) => {
    const { id } = req.params;

    Categorias.findById(id, (err, categoria) => {
      if (err || !categoria) return res.status(404).send({ message: `${err.message} - categoria não encontrada` });
      return res.status(200).send(categoria);
    });
  };

  static alterarCategoria = (req, res) => {
    const { id } = req.params;
    const regex = /^[A-z][A-z0-9]{3,}$/;

    if (regex.test(req.body.nome)) {
      Categorias.findByIdAndUpdate(id, { $set: req.body }, (err) => {
        if (err) {
          res.status(404).send({ message: `${err} - Categoria não encontrada` });
        } else {
          return res.status(200).send({ message: 'Categoria atualizada com sucesso' });
        }
      });
    } else {
      return res.status(400).send({ message: 'O formato de nome especificado é inválido' });
    }
  };

  static removerCategoria = (req, res) => {
    const { id } = req.params;

    Categorias.findByIdAndDelete(id, (err) => {
      if (err) return res.status(404).send({ message: `${err.message} - categoria não encontrada` });
      return res.status(200).send({ message: 'Categoria removida com sucesso' });
    });
  };

  static ativarCategoria = (req, res) => {
    const { id } = req.params;

    Categorias.findByIdAndUpdate(id, { $set: { status: 'ativa' } }, (err) => {
      if (err) return res.status(404).send({ message: `${err.message} - categoria não encontrada` });
      return res.status(200).send({ message: 'Categoria ativada com sucesso' });
    });
  };
}

export default CategoriaController;
