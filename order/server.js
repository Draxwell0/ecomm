import app from './src/main.js';

const PORT = process.env.PORT || 3004;
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Servidor escutando na porta ${PORT}`));
