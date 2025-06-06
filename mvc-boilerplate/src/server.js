const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
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

// Log de todas as requisições para depuração
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Página principal: lista de tarefas do banco de dados
app.get('/tarefas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tarefas ORDER BY id DESC');
    res.render('tarefas', { tarefas: result.rows });
  } catch (err) {
    res.status(500).send('Erro ao buscar tarefas: ' + err.message);
  }
});

// Página de formulário para cadastrar nova tarefa
app.get('/tarefas/nova', (req, res) => {
  res.render('novaTarefa');
});

// Cadastro de tarefa (formulário)
app.post('/tarefas/nova', async (req, res) => {
  const { nome, descricao } = req.body;
  try {
    await pool.query('INSERT INTO tarefas (nome, descricao) VALUES ($1, $2)', [nome, descricao]);
    res.redirect('/tarefas');
  } catch (err) {
    res.status(500).send('Erro ao cadastrar tarefa: ' + err.message);
  }
});

// Adicione após as configurações iniciais e antes das rotas /api

// Listar autores
app.get('/autores', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM autores ORDER BY nome');
    res.render('autores', { autores: result.rows });
  } catch (err) {
    res.status(500).send('Erro ao buscar autores: ' + err.message);
  }
});

// Listar livros
app.get('/livros', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT livros.*, autores.nome AS autor_nome
      FROM livros
      LEFT JOIN autores ON livros.id_autor = autores.id
      ORDER BY livros.titulo
    `);
    res.render('livros', { livros: result.rows });
  } catch (err) {
    res.status(500).send('Erro ao buscar livros: ' + err.message);
  }
});

// Listar vendas
app.get('/vendas', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT vendas.*, livros.titulo AS livro_titulo
      FROM vendas
      LEFT JOIN livros ON vendas.id_livro = livros.id
      ORDER BY vendas.data_venda DESC
    `);
    res.render('vendas', { vendas: result.rows });
  } catch (err) {
    res.status(500).send('Erro ao buscar vendas: ' + err.message);
  }
});

// Página que exibe autores, livros e vendas juntos
app.get('/livraria', async (req, res) => {
  try {
    const autores = (await pool.query('SELECT * FROM autores ORDER BY nome')).rows;
    const livros = (await pool.query(`
      SELECT livros.*, autores.nome AS autor_nome
      FROM livros
      LEFT JOIN autores ON livros.id_autor = autores.id
      ORDER BY livros.titulo
    `)).rows;
    const vendas = (await pool.query(`
      SELECT vendas.*, livros.titulo AS livro_titulo
      FROM vendas
      LEFT JOIN livros ON vendas.id_livro = livros.id
      ORDER BY vendas.data_venda DESC
    `)).rows;
    res.render('livraria', { autores, livros, vendas });
  } catch (err) {
    console.error('Erro detalhado ao buscar dados da livraria:', err); // Adicionado log detalhado
    res.status(500).send('Erro ao buscar dados da livraria: ' + err.message);
  }
});

// Página de formulário para cadastrar autor, livro e venda
app.get('/livraria/novo', async (req, res) => {
  try {
    const autores = (await pool.query('SELECT * FROM autores ORDER BY nome')).rows;
    const livros = (await pool.query('SELECT * FROM livros ORDER BY titulo')).rows;
    res.render('livrariaNovo', { autores, livros });
  } catch (err) {
    console.error('Erro detalhado ao carregar formulário:', err); // Adicionado log detalhado
    res.status(500).send('Erro ao carregar formulário: ' + err.message);
  }
});

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

// Rota principal (pode redirecionar para /tarefas)
app.get('/', (req, res) => {
  res.redirect('/tarefas');
});

app.use('/api', routes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
