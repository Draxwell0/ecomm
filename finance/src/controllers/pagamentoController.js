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
    
    static async respostaPagamento(req, res){
        const {id} = req.params
        const {status} = req.body
        
        try{
            const pagamento = await database.payments.findOne({where: {id: Number(id)}})

            if(!pagamento){
                throw new Error('Este id não existe')
            }
            if(pagamento.status === 'confirmado' || pagamento.status === 'cancelado'){
                return res.status(400).send('Estado do pagamento já foi declarado e é imutável')
            }
            if(
                status &&
                (status.toLowerCase() === 'confirmado'
                || status.toLowerCase() === 'cancelado')
            ){
                await database.payments.update({status}, {where: {id: Number(id)}})
                return res.status(200).send(`Pagamento ${status}.`)
            }else{
                throw new Error('Formato de status inválido')
            }
        }catch(err){
            return res.status(404).json(err.message)
        }
    }
}

module.exports = PagamentoController