const pool = require('../config/database');

// Listar autores
exports.index = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM autores ORDER BY nome');
    res.render('autores', { autores: result.rows });
  } catch (err) {
    res.status(500).send('Erro ao buscar autores: ' + err.message);
  }
};

// Criar autor
exports.store = async (req, res) => {
  const { nome, nacionalidade } = req.body;
  try {
    await pool.query(
      'INSERT INTO autores (nome, nacionalidade) VALUES ($1, $2)',
      [nome, nacionalidade]
    );
    res.redirect('/autores');
  } catch (err) {
    res.status(500).send('Erro ao cadastrar autor: ' + err.message);
  }
};