import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
        id: {type: String},
        quantidade: {type: Number},
        desconto: {type: Number},
        precoUnitario: {type: Number},
})

const pedidoSchema = new mongoose.Schema({
    id: {type: String},
    idCliente: {type: mongoose.Types.ObjectId},
    status: {type: String, default: 'realizado'},
    enderecoEntrega: {
        rua: {type: String},
        numero: {type: String},
        complemento: {type: String},
        cep: {type: String},
        cidade: {type: String},
        estado: {type: String},
    },
    itens: {type: [itemSchema]}
}, {versionKey: false})

const pedido = mongoose.model('orders', pedidoSchema);

export default pedido