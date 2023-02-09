const database = require('../models')

class PagamentoController {

    static async inserirPagamento(req, res){
        const dados = req.body
        try{
            const novoPagamento = await database.payments.create(dados)
            return res.status(201)
                .location('/payments/' + novoPagamento.dataValues.id)
                .json(`id: ${novoPagamento.dataValues.id}, status: Criado`)
        }catch(err){
            return res.status(500).json(err.message)
        }
    }
    
    static async listarPagamentoPorId(req, res){
        const {id} = req.params
        try{
            const dados = await database.payments.findOne({where: {id: Number(id)}})
            const {cvv, ...pagamento} = dados.dataValues
            return res.status(200).json(pagamento)
        }catch(err){
            return res.status(500).json(err.message)
        }
    }
}

module.exports = PagamentoController