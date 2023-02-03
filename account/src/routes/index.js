import express from 'express'
import usuarios from './usuariosRoutes.js'

const routes = (app)=>{
    app.use(
        express.json(),
        usuarios
    )
}

export default routes