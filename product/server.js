import app from "./src/main.js";

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{console.log(`Servidor escutando na porta ${PORT}`)});