const pool = require('../config/database');

// Listar tarefas
exports.listarTarefas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tarefas ORDER BY id DESC');
    res.render('tarefas', { tarefas: result.rows });
  } catch (err) {
    res.status(500).send('Erro ao buscar tarefas: ' + err.message);
  }
};

// Criar tarefa
exports.criarTarefa = async (req, res) => {
  const { nome, descricao } = req.body;
  try {
    await pool.query(
      'INSERT INTO tarefas (nome, descricao) VALUES ($1, $2)',
      [nome, descricao]
    );
    res.redirect('/tarefas');
  } catch (err) {
    res.status(500).send('Erro ao cadastrar tarefa: ' + err.message);
  }
};

// Página de nova tarefa
exports.novaTarefa = (req, res) => {
  res.render('novaTarefa');
};

// Atualizar uma tarefa
exports.editarTarefa = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, status } = req.body;

  const query = `
    UPDATE tarefas SET nome = $1, descricao = $2, status = $3, updated_at = CURRENT_TIMESTAMP
    WHERE id = $4 RETURNING *`;
  const values = [nome, descricao, status, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma tarefa
exports.excluirTarefa = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM tarefas WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};