const app = require('./src/main.js');

const PORT = process.env.PORT || 3003;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Servidor escutando na porta ${PORT}`));
