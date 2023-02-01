import express from 'express'
import categorias from './categoriasRoutes.js'

const routes = (app)=>{
    app.use(
        express.json(),
        categorias
    )
}

export default routes