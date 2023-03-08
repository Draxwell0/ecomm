/* eslint-disable no-useless-escape */
import mongoose from 'mongoose';

const usuarioSchema = new mongoose.Schema({
  id: { type: String },
  nome: { type: String, required: true },
  email: { type: String, required: true, match: /^[A-z0-9'"!@#$%¨&*()\-_=+´`~^;:¨\/.,<>{|}\\]+@[A-z0-9](?:[A-z0-9-]{0,255}[A-z0-9])?(?:\.[A-z0-9](?:[A-z0-9-]{0,255}[A-z0-9])?)*$/ },
  senha: { type: String, required: true },
  dataCriacao: { type: Date },
  cpf: { type: String, required: true, match: /^\d{11}$/ },
  telefone: { type: String, required: true, match: /^\d{10,13}$/ },
  endereco: {
    rua: { type: String, required: true },
    numero: { type: String, required: true },
    complemento: { type: String, required: true },
    cep: { type: String, required: true, match: /^\d{8}$/ },
    cidade: { type: String, required: true },
    estado: { type: String, required: true },
  },
}, { versionKey: false });

const usuario = mongoose.model('accounts', usuarioSchema);

export default usuario;
