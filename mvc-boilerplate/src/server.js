const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Log de todas as requisições para depuração
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Rota principal deve vir antes das rotas /api
app.get('/', (req, res) => {
  res.send('API de Tarefas está rodando!');
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
