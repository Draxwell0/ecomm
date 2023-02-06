import categorias from '../models/Categoria.js'

class CategoriaController{

    static listarCategorias = (req, res)=>{
        categorias.find((err, categorias)=>{
            res.status(200).json(categorias)
        }).select({nome: 1})
    }

    static inserirCategoria = (req, res)=>{
        const categoria = new categorias(req.body)
        const regex = /^[A-z][A-z0-9]{3,}$/

        if(regex.test(categoria.nome)){
            categoria.save(err=>{
                if(err){
                    res.status(500).send({message: `${err.message} - falha ao inserir categoria`})
                } else{
                    res.status(201).send(categoria.toJSON())
                }
            })
        } else{
            res.status(400).send('O formato de nome especificado é inválido')
        }
    }

    static listarCategoriaPorId = (req, res)=>{
        const id = req.params.id

        categorias.findById(id, (err, categoria)=>{
            if(err || !categoria){
                res.status(404).send({message: `${err.message} - categoria não encontrada`})
            }else{
                res.status(200).send(categoria)
            }
        })
    }

    static alterarCategoria = (req, res)=>{
        const id = req.params.id
        const regex = /^[A-z][A-z0-9]{3,}$/

        if(regex.test(req.body.nome)){
            categorias.findByIdAndUpdate(id, {$set: req.body}, (err)=>{
                if(err){
                    res.status(404).send({message: `${err} - Categoria não encontrada`})
                    res.status(400).send('O formato especificado é inválido')
                }else{
                    res.status(204).send('Categoria atualizada com sucesso')
                }
            })
        }else{
            res.status(400).send('O formato de nome especificado é inválido')
        }

    }

    static removerCategoria = (req, res)=>{
        const id = req.params.id

        categorias.findByIdAndDelete(id, (err)=>{
            if(err){
                res.status(404).send({message: `${err.message} - categoria não encontrada`})
            } else{
                res.status(204).send('Categoria removida com sucesso')
            }
        })
    }

    static ativarCategoria = (req, res)=>{
        const id = req.params.id

        categorias.findByIdAndUpdate(id, {$set: {"status": "ativa"}}, (err)=>{
            if(err){
                res.status(404).send({message: `${err.message} - categoria não encontrada`})
            }else{
                res.status(204).send('Categoria ativada com sucesso')
            }
        })
    }
}

export default CategoriaController