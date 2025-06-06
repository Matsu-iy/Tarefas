const pool = require('../config/database');

// Listar livros
exports.index = async (req, res) => {
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
};

// Criar livro
exports.store = async (req, res) => {
  const { titulo, ano_publicacao, preco, id_autor } = req.body;
  try {
    await pool.query(
      'INSERT INTO livros (titulo, ano_publicacao, preco, id_autor) VALUES ($1, $2, $3, $4)',
      [titulo, ano_publicacao || null, preco || null, id_autor || null]
    );
    res.redirect('/livros');
  } catch (err) {
    res.status(500).send('Erro ao cadastrar livro: ' + err.message);
  }
};