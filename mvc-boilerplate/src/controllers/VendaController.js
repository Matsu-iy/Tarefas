const pool = require('../config/database');

// Listar vendas
exports.index = async (req, res) => {
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
};

// Criar venda
exports.store = async (req, res) => {
  const { id_livro, data_venda, quantidade } = req.body;
  try {
    await pool.query(
      'INSERT INTO vendas (id_livro, data_venda, quantidade) VALUES ($1, $2, $3)',
      [id_livro || null, data_venda || null, quantidade || null]
    );
    res.redirect('/vendas');
  } catch (err) {
    res.status(500).send('Erro ao cadastrar venda: ' + err.message);
  }
};