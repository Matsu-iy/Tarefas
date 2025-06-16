const express = require('express');
const router = express.Router();
const Livro = require('../models/Livro');
const Autor = require('../models/Autor');
const LivrariaController = require('../controllers/LivrariaController');
const pool = require('../db'); // Certifique-se de que o caminho para o seu módulo de banco de dados está correto

// Rotas de livros
router.get('/livros', async (req, res) => {
    try {
        const livros = await Livro.findAll();
        res.json(livros);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Buscar livro específico
router.get('/livros/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM livros WHERE id = $1',
            [req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/livros/:id', async (req, res) => {
    try {
        const livro = await Livro.update(req.params.id, req.body);
        res.json(livro);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/livros/:id', async (req, res) => {
    try {
        await Livro.delete(req.params.id);
        res.json({ message: 'Livro excluído com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Rotas de autores
router.get('/autores', async (req, res) => {
    try {
        const autores = await Autor.findAll();
        res.json(autores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST routes
router.post('/autores', LivrariaController.createAutor);
router.post('/livros', LivrariaController.createLivro);

module.exports = router;
