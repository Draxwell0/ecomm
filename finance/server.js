const dotenv = require('dotenv');
const app = require('./src/main.js');

dotenv.config();

const { PORT } = process.env;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Servidor escutando na porta ${PORT}`));
