import express from 'express';
import usuarios from './usuariosRoutes.js';
// import swaggerUi from 'swagger-ui-express';
// import swaggerDoc from '../../swagger/account.json' assert {type: "json"};

const routes = (app) => {
  app.use(
    express.json(),
    usuarios,
  );
  // app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
};

export default routes;
