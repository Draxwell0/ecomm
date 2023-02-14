import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
    id: {type: String},
    nome: {type: String, required: true},
    email: {type: String, required: true},
    senha: {type: String},
    dataCriacao: {type: Date},
    cpf: {type: String},
    telefone: {type: String},
    endereco: {
        rua: {type: String, required: true},
        numero: {type: String},
        complemento: {type: String},
        cep: {type: String},
        cidade: {type: String, required: true},
        estado: {type: String, required: true}
    }
}, {versionKey: false})

const usuario = mongoose.model('accounts', usuarioSchema)

export default usuario