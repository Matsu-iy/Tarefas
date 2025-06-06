const pool = require('../config/database');

class Autor {
    static async findAll() {
        const result = await pool.query('SELECT * FROM autores ORDER BY nome');
        return result.rows;
    }

    static async create(data) {
        const { nome, nacionalidade } = data;
        const result = await pool.query(
            'INSERT INTO autores (nome, nacionalidade) VALUES ($1, $2) RETURNING *',
            [nome, nacionalidade]
        );
        return result.rows[0];
    }
}

module.exports = Autor;
