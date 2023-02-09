const database = require('../models')

class PagamentoController {

    static async inserirPagamento(req, res){
        const dados = req.body
        try{
            const novoPagamento = await database.payments.create(dados)
            return res.status(201).json(`id: ${novoPagamento.dataValues.id}, status: Criado`)
        }catch(err){
            return res.status(500).json(err.message)
        }
    }

}

module.exports = PagamentoController