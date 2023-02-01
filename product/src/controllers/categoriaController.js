import categorias from '../models/Categoria.js'

class CategoriaController{

    static listarCategorias = (req, res)=>{
        categorias.find((err, categorias)=>{
            res.status(200).json(categorias)
        }).select({nome: 1})
    }

}

export default CategoriaController