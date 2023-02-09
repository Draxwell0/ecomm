const express = require('express')
const pagamentos = require('./pagamentosRoutes.js')

const routes = (app) =>{
    app.use(
        express.json(),
        pagamentos
    )
}

module.exports = routes