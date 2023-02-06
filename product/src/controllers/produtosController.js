import produtos from '../models/Produto.js'
import categorias from '../models/Categoria.js'

class ProdutosController {

    static listarProdutos = (req, res)=>{
        produtos.find((err, produto)=>{
            res.status(200).json(produto)
        })
    }

    static inserirProduto = (req, res)=>{
        const produto = new produtos(req.body)
        const regexNome = /^[A-z][A-z0-9]{3,}$/
        const regexSlug = /^[A-z0-9-]+$/
        
        categorias.findById(produto.categoria.id, (err, elm)=>{
            try{
                if(err) throw new Error(err)
                if(
                    regexNome.test(produto.produto) //model.produto = nome do produto
                    && regexSlug.test(produto.slug)
                    && produto.precoUnitario > 0
                    && produto.quantidadeEmEstoque > 0
                    && produto.quantidadeEmEstoque < 10000
                    && produto.categoria.nome == elm.nome
                ){
                    produto.save(err=>{
                        res.status(201).send(produto.toJSON())
                    })
                }else{
                    res.status(400).send({message: 'Dados inválidos, verifique a procedência das informações'})
                }

            }catch(err){
                res.status(400).send({message: `${err} - o id da categoria não existe`})
            }
        })
    }

    static listarProdutoPorId = (req, res)=>{
        const id = req.params.id

        produtos.findById(id, (err, produto)=>{
            if(err || !produto){
                res.status(404).send({message: `${err} - o id inserido não existe`})
            }else{
                res.status(200).send(produto)
            }
        })
    }

    static alterarProduto = (req, res)=>{
        const id = req.params.id
        const produto = new produtos(req.body)
        const regexNome = /^[A-z][A-z0-9]{3,}$/
        const regexSlug = /^[A-z0-9-]+$/
        
        produtos.findById(id, (err, elm)=>{
            if(err){
                res.status(404).send({message: `${err.message} - o id inserido não existe`})
            }else{
                categorias.findById(produto.categoria.id, (err, elm)=>{
                    try{
                        if(err) throw new Error(err)
                        if(
                            regexNome.test(produto.produto) //model.produto = nome do produto
                            && regexSlug.test(produto.slug)
                            && produto.precoUnitario > 0
                            && produto.quantidadeEmEstoque > 0
                            && produto.quantidadeEmEstoque < 10000
                            && produto.categoria.nome == elm.nome
                        ){
                            produtos.findByIdAndUpdate(id, {$set: req.body}, (err)=>{
                                if(err){
                                    res.status(400).send({message: `${err.message} - O formato especificado é inválido`})
                                    res.status(404).send({message: `${err} - Produto não encontrado`})
                                }else{
                                    res.status(204).send('Produto atualizado com sucesso')
                                }
                            })
                        }else{
                            res.status(400).send({message: 'Dados inválidos, verifique a procedência das informações'})
                        }
        
                    }catch(err){
                        res.status(400).send({message: `${err} - o id da categoria não existe`})
                    }
                })

            }
        })
    }

    static removerProduto = (req, res)=>{
        const id = req.params.id

        produtos.findByIdAndDelete(id, (err)=>{
            if(err){
                res.status(404).send('Produto não encontrado')
            }else{
                res.status(204).send('Produto removido com sucesso')
            }
        })
    }
}

export default ProdutosController