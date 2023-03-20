import dotenv from 'dotenv';
import { createProxyMiddleware } from 'http-proxy-middleware';

dotenv.config();
const {
  PRODUCTS_HOST, PRODUCTS_PORT,
  ACCOUNTS_HOST, ACCOUNTS_PORT,
  FINANCE_HOST, FINANCE_PORT,
  ORDERS_HOST, ORDERS_PORT,
} = process.env;

const productsServiceProxy = createProxyMiddleware({ target: `http://${PRODUCTS_HOST}:${PRODUCTS_PORT}`, changeOrigin: true });
const accountsServiceProxy = createProxyMiddleware({ target: `http://${ACCOUNTS_HOST}:${ACCOUNTS_PORT}`, changeOrigin: true });
const financeServiceProxy = createProxyMiddleware({ target: `http://${FINANCE_HOST}:${FINANCE_PORT}`, changeOrigin: true });
const ordersServiceProxy = createProxyMiddleware({ target: `http://${ORDERS_HOST}:${ORDERS_PORT}`, changeOrigin: true });

export {
  productsServiceProxy,
  accountsServiceProxy,
  financeServiceProxy,
  ordersServiceProxy,
};
