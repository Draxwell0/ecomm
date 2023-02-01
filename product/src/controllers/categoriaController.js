import categorias from '../models/Categoria.js'

class CategoriaController{

    static listarCategorias = (req, res)=>{
        categorias.find((err, categorias)=>{
            res.status(200).json(categorias)
        }).select({nome: 1})
    }

    static inserirCategoria = (req, res)=>{
        const categoria = new categorias(req.body)
        const regex = /^[A-z][A-z0-9]{2,}$/

        if(regex.test(categoria.nome)){
            categoria.save(err=>{
                if(err){
                    res.status(500).send({message: `${err.message} - falha ao inserir categoria`})
                } else{
                    res.status(200).send(categoria.toJSON())
                }
            })
        } else{
            res.status(400).send('O formato de nome especificado é inválido')
        }
    }

}

export default CategoriaController