import express from 'express';
import productsRouter from './routes/produtosRoutes.js';
import categoriesRouter from './routes/categoriasRoutes.js';
import accountsRouter from './routes/usuariosRoutes.js';
import ordersRouter from './routes/pedidosRoutes.js';
import financeRouter from './routes/pagamentosRoutes.js';
import './utils/autenticacaoBearer.js';

const app = express();
app.use(
  categoriesRouter,
  productsRouter,
  accountsRouter,
  ordersRouter,
  financeRouter,
);

export default app;
