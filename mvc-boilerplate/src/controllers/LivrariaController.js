const Autor = require('../models/Autor');
const Livro = require('../models/Livro');

exports.index = async (req, res) => {
    try {
        const autores = await Autor.findAll();
        const livros = await Livro.findAll();
        // Initialize empty vendas array
        const vendas = [];
        res.render('livraria', { autores, livros, vendas });
    } catch (err) {
        console.error('Erro:', err);
        res.status(500).send('Erro ao buscar dados');
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
