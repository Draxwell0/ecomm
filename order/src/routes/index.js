import express from 'express'
import pedidos from './pedidosRoutes.js'

const routes = (app) =>{
    app.use(
        express.json(),
        pedidos
    )
}

export default routes