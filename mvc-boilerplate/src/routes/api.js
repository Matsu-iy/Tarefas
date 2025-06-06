const express = require('express');
const router = express.Router();
const Livro = require('../models/Livro');
const Autor = require('../models/Autor');

router.get('/livros', async (req, res) => {
    try {
        const livros = await Livro.findAll();
        res.json(livros);
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

router.get('/autores', async (req, res) => {
    try {
        const autores = await Autor.findAll();
        res.json(autores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/autores', LivrariaController.createAutor);
router.post('/livros', LivrariaController.createLivro);

module.exports = router;
