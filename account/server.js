/* eslint-disable no-console */
import app from './src/main.js';
import db from './src/config/dbConnect.js';

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('Conexão com o banco de dados feita com sucesso');
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => { console.log(`Servidor escutando na porta ${PORT}`); });
