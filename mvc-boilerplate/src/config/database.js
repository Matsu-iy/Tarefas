// config/database.js
require('dotenv').config();
// Importando o pacote 'pg' para conexão com o PostgreSQL
const { Pool } = require('pg');
// Configuração do banco de dados PostgreSQL usando o pacote 'pg'
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: {
    rejectUnauthorized: false
  }
});

// Test connection immediately
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Successfully connected to Supabase');
    release();
  }
});

// Error handling
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

module.exports = pool;