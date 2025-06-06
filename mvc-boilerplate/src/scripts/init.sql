-- Ativar extensão de UUID, se ainda não estiver ativa
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar tabela de Autores
CREATE TABLE IF NOT EXISTS autores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    nacionalidade VARCHAR(50)
);

-- Criar tabela de Livros
CREATE TABLE IF NOT EXISTS livros (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(150) NOT NULL,
    ano_publicacao INT,
    preco NUMERIC(10, 2),
    id_autor UUID REFERENCES autores(id)
);

-- Criar tabela de Vendas
CREATE TABLE IF NOT EXISTS vendas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_livro UUID REFERENCES livros(id),
    data_venda DATE,
    quantidade INT
);

-- Criar tabela users
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'user'
);

-- Criar tabela categories
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Criar tabela tarefas (alinhar nome com tasks se preferir)
CREATE TABLE IF NOT EXISTS tarefas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT
);

-- Corrigir referência em comments:
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    task_id INTEGER REFERENCES tarefas(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
    content TEXT NOT NULL
);
