import express from 'express'
import categorias from './categoriasRoutes.js'
import produtos from './produtosRoutes.js'
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from '../../swagger/product.json' assert {type: "json"}

const routes = (app)=>{
    app.use(
        express.json(),
        categorias,
        produtos
    )

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
}

export default routes