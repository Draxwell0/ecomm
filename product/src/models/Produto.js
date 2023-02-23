import mongoose from 'mongoose';

const produtoSchema = new mongoose.Schema({
  id: { type: String },
  produto: { type: String, required: true, match: /^[A-z][A-z0-9]{3,}$/ },
  descricao: { type: String, required: true },
  slug: { type: String, required: true, match: /^[A-z0-9-]+$/ },
  precoUnitario: { type: Number, required: true, min: 0.01 },
  quantidadeEmEstoque: {
    type: Number, required: true, min: 1, max: 10000,
  },
  categoria: {
    nome: { type: String, required: true },
    id: { type: String, required: true },
  },
}, { versionKey: false });

const produto = mongoose.model('products', produtoSchema);

export default produto;
