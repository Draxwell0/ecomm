import mongoose from 'mongoose'

const itemSchema = new mongoose.Schema({
        id: {type: String, required: true},
        quantidade: {type: Number, required: true},
        desconto: {type: Number, required: true},
        precoUnitario: {type: Number, required: true},
})

const pedidoSchema = new mongoose.Schema({
    id: {type: String},
    idCliente: {type: mongoose.Types.ObjectId, required: true},
    status: {type: String, default: 'realizado', required: true},
    enderecoEntrega: {
        rua: {type: String, required: true},
        numero: {type: String, required: true},
        complemento: {type: String, required: true},
        cep: {type: String, required: true},
        cidade: {type: String, required: true},
        estado: {type: String, required: true},
    },
    itens: {type: [itemSchema], required: true}
}, {versionKey: false})

const pedido = mongoose.model('orders', pedidoSchema);

export default pedido