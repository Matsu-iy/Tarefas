const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./config/database');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const LivrariaController = require('./controllers/LivrariaController');

// Views routes
app.get('/', (req, res) => res.redirect('/livraria'));
app.get('/livraria', LivrariaController.index);
app.get('/livraria/novo', LivrariaController.novoForm);

// API routes
app.use('/api', require('./routes'));

// Cadastro de autor
app.post('/livraria/novo/autor', async (req, res) => {
  const { nome, nacionalidade } = req.body;
  try {
    await pool.query(
      'INSERT INTO autores (nome, nacionalidade) VALUES ($1, $2)',
      [nome, nacionalidade]
    );
    res.redirect('/livraria');
  } catch (err) {
    res.status(500).send('Erro ao cadastrar autor: ' + err.message);
  }
});

// Cadastro de livro
app.post('/livraria/novo/livro', async (req, res) => {
  const { titulo, ano_publicacao, preco, id_autor } = req.body;
  try {
    await pool.query(
      'INSERT INTO livros (titulo, ano_publicacao, preco, id_autor) VALUES ($1, $2, $3, $4)',
      [titulo, ano_publicacao || null, preco || null, id_autor || null]
    );
    res.redirect('/livraria');
  } catch (err) {
    res.status(500).send('Erro ao cadastrar livro: ' + err.message);
  }
});

// Cadastro de venda
app.post('/livraria/novo/venda', async (req, res) => {
  const { id_livro, data_venda, quantidade } = req.body;
  try {
    await pool.query(
      'INSERT INTO vendas (id_livro, data_venda, quantidade) VALUES ($1, $2, $3)',
      [id_livro || null, data_venda || null, quantidade || null]
    );
    res.redirect('/livraria');
  } catch (err) {
    res.status(500).send('Erro ao cadastrar venda: ' + err.message);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log('\nLinks disponíveis:');
  console.log('=================');
  console.log('Página principal:');
  console.log('http://localhost:3000/');
  console.log('\nPáginas de listagem:');
  console.log('http://localhost:3000/livraria');
  console.log('http://localhost:3000/livros');
  console.log('http://localhost:3000/autores');
  console.log('\nPáginas de cadastro:');
  console.log('http://localhost:3000/livraria/novo');
  console.log('\nAPI endpoints:');
  console.log('http://localhost:3000/api/autores');
  console.log('http://localhost:3000/api/livros');
  console.log('=================\n');
});
