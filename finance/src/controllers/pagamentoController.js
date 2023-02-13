const db = require('../models')
const database = require('../models')

class PagamentoController {

    static async inserirPagamento(req, res){
        const dados = req.body
        try{
            const novoPagamento = await database.payments.create(dados)
            const arrLinks = [
                {
                    rel: "confirm-payment",
                    method: "PATCH",
                    href: `http://localhost:3003/payments/${novoPagamento.dataValues.id}?status=confirm`
                }, 
                {
                    rel: "cancel-payment",
                    method: "PATCH",
                    href: `http://localhost:3003/payments/${novoPagamento.dataValues.id}?status=cancel`
                }
            ]

            return res.status(201)
                .location('/payments/' + novoPagamento.dataValues.id)
                .json({"id": novoPagamento.dataValues.id, "status": "Criado", arrLinks})
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
        let {status} = req.query
        let descricao = req.body

        status === 'confirm' ? status = 'confirmado' : status = status
        status === 'cancel' ? status = 'cancelado' : status = status

        try{ 
            //verificação se pagamento existe
            const pagamento = await database.payments.findOne({where: {id: Number(id)}})
            if(!pagamento) return res.status(404).json('O id informado não existe')

            //verificação se está como criado
            if(pagamento.status.toLowerCase() === 'criado'){

                //verificação se foi confirmado ou cancelado
                if(status.toLowerCase() == 'confirmado'){ 
                    database.sequelize.transaction(async t =>{
                        await database.payments.update({status}, {where: {id: Number(id)}}, {transaction: t})
                        const notaFiscal = await database.Invoices.create({descricao, "idPagamento": id}, {transaction: t})

                        return res.status(200).json(notaFiscal)
                    })
                }else{
                    await database.payments.update({status}, {where: {id: Number(id)}})
                    res.status(200).json(`Pagamento ${status}.`)
                }
            }else {
                return res.status(422).json('Não é possível alterar o status')
            }
        }catch(err){
            return res.status(400).json(err.message)
        }
    }
    
}

module.exports = PagamentoController