import mongoose from 'mongoose'

const produtoSchema = new mongoose.Schema({
    id: {type: String},
    produto: {type: String, required: true},
    descricao: {type: String},
    slug: {type: String},
    precoUnitario: {type: Number},
    quantidadeEmEstoque: {type: Number},
    categoria: {
        nome: {type: String},
        id: {type: String}
    }
}, {versionKey: false})

const produto = mongoose.model('products', produtoSchema)

export default produto