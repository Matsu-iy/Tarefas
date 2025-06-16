const Autor = require('../models/Autor');
const Livro = require('../models/Livro');

exports.index = async (req, res) => {
    try {
        const autores = await Autor.findAll();
        const livros = await Livro.findAll();
        const vendas = []; // Temporário até implementar modelo de Vendas
        res.render('livraria', { autores, livros, vendas });
    } catch (err) {
        console.error('Erro ao carregar dashboard:', err);
        res.status(500).render('error', { 
            message: 'Erro ao carregar dados',
            error: process.env.NODE_ENV === 'development' ? err : {}
        });
    }
};

exports.novoForm = async (req, res) => {
    try {
        const autores = await Autor.findAll();
        const livros = await Livro.findAll();
        res.render('livrariaNovo', { autores, livros });
    } catch (err) {
        res.status(500).send('Erro ao carregar formulário');
    }
};

exports.createAutor = async (req, res) => {
    try {
        await Autor.create(req.body);
        res.redirect('/livraria');
    } catch (err) {
        res.status(500).send('Erro ao cadastrar autor');
    }
};

exports.createLivro = async (req, res) => {
    try {
        await Livro.create(req.body);
        res.redirect('/livraria');
    } catch (err) {
        res.status(500).send('Erro ao cadastrar livro');
    }
};
