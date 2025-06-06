const pool = require('../config/database');

class Livro {
    static async findAll() {
        const result = await pool.query(`
            SELECT livros.*, autores.nome AS autor_nome
            FROM livros
            LEFT JOIN autores ON livros.id_autor = autores.id
            ORDER BY livros.titulo
        `);
        return result.rows;
    }

    static async create(data) {
        const { titulo, ano_publicacao, preco, id_autor } = data;
        const result = await pool.query(
            'INSERT INTO livros (titulo, ano_publicacao, preco, id_autor) VALUES ($1, $2, $3, $4) RETURNING *',
            [titulo, ano_publicacao || null, preco || null, id_autor || null]
        );
        return result.rows[0];
    }

    static async update(id, data) {
        const { titulo, ano_publicacao, preco, id_autor } = data;
        const result = await pool.query(
            'UPDATE livros SET titulo = $1, ano_publicacao = $2, preco = $3, id_autor = $4 WHERE id = $5 RETURNING *',
            [titulo, ano_publicacao || null, preco || null, id_autor || null, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM livros WHERE id = $1 RETURNING *', [id]);
        return result.rows[0];
    }
}

module.exports = Livro;
