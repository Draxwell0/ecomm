import pedidos from '../models/Pedido.js'

class PedidoController {

    static inserirPedido = (req, res)=>{
        const pedido = new pedidos(req.body)

        try{
            pedido.save(err=>{
                if(err) res.status(500).send('Houve um erro ao inserir o pedido')
                res.status(201).send(pedido.toJSON())
            })
        }catch(err){
            res.status(400).send({message: 'Dados inválidos, verifique a procedência das informações'})
        }
    }

    static confirmarPedido = (req, res)=>{
        const {idPedido} = req.params
        const {idPagamento} = req.body

        try{
            pedidos.findByIdAndUpdate(idPedido, {$set: {status: 'pago'}}, (err)=>{
                if(err) return res.status(404).send('O pedido inserido não existe')
                res.status(200).send('Pedido pago')
            })

            pedidos.findById(idPedido, async (err, pedido)=>{
                if(!err){
                    // obter o nome, CPF e endereço completo do cliente
                    const cliente = await fetch(`http://account:3002/api/users/${pedido.idCliente}`)
                    const {nome, cpf, endereco} = await cliente.json()
                    
                    // obter o nome dos produtos, se necessário
                    const nomesProdutos = await Promise.all(
                        pedido.itens.map(async (elm)=>{
                            let produto = await fetch(`http://product:3001/api/products/${elm.id}`)
                            produto = await produto.json()
                            return produto.produto //model.produto = nome do produto
                        })    
                    )
                    
                    // confirmar o pagamento passando todas as informações de produto para a geração da nota fiscal
                    await fetch(`http://finance:3003/api/payments/${idPagamento}?status=confirm`, {
                        method: 'PATCH',
                        body: JSON.stringify({nome, cpf, endereco, itens: pedido.itens}),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                } 
            })
        }catch(err){
            res.status(404).send(err.message)
        }
    }

}

export default PedidoController