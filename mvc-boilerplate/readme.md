# TaskManager

Este projeto é uma aplicação web para gerenciamento de tarefas, desenvolvido utilizando **Node.js** com **Express.js** e **PostgreSQL**, seguindo o padrão arquitetural **MVC** (Model-View-Controller).

## Descrição do Projeto

A aplicação TaskManager tem como objetivo permitir que usuários organizem e acompanhem tarefas de forma eficiente. Os usuários podem criar tarefas, classificá-las por categorias, atribuir prioridades, acompanhar seu status e adicionar comentários. O sistema promove organização pessoal e produtividade, sendo ideal para projetos acadêmicos e pessoais.

## Requisitos

- Node.js (versão 14.x ou superior)
- PostgreSQL (versão 12.x ou superior)

## Instalação

**Clonar o repositório:**
```bash
git clone https://github.com/seu-usuario/seu-projeto.git
cd seu-projeto
```

## Como iniciar o projeto

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Configure o arquivo `.env`:**
   - Copie o arquivo `.env.example` para `.env` (ou crie um `.env`).
   - Preencha as variáveis de ambiente com as credenciais do seu banco PostgreSQL.

3. **Inicialize o banco de dados:**
   ```bash
   npm run init-db
   ```

4. **Inicie o servidor:**
   ```bash
   npm start
   ```
   Ou, para desenvolvimento com recarregamento automático:
   ```bash
   npm run dev
   ```

5. **Acesse a aplicação:**
   - Abra o navegador em [http://localhost:3000](http://localhost:3000)

## Configuração do Banco de Dados

**Criar banco de dados no PostgreSQL:**

Crie um banco de dados com o nome especificado no seu `.env`.

**Executar o script de inicialização do banco:**
```bash
npm run init-db
```
Isso criará as tabelas `users`, `tasks`, `categories` e `comments`, além de configurar os relacionamentos adequados entre elas.

## Funcionalidades

- **Cadastro de Usuários:** Gerenciamento de contas com diferentes níveis de acesso (via campo `role`).
- **Gerenciamento de Tarefas:** Criação, atualização, visualização e remoção de tarefas.
- **Categorias de Tarefas:** Classificação de tarefas por categorias com nome e descrição.
- **Prioridades e Status:** Acompanhamento das tarefas por prioridade (`low`, `medium`, `high`) e status (`pending`, `in_progress`, `completed`).
- **Comentários:** Sistema de comentários para comunicação entre usuários em cada tarefa.
- **Relacionamentos entre entidades:** Associação entre usuários, tarefas, categorias e comentários.

## Funcionalidades de Livraria

O sistema possui um módulo completo de livraria com as seguintes funcionalidades:

### Páginas Principais

- **Dashboard da Livraria:**  
  [http://localhost:3000/livraria](http://localhost:3000/livraria)  
  Visualização unificada de autores, livros e vendas.

- **Cadastros:**  
  [http://localhost:3000/livraria/novo](http://localhost:3000/livraria/novo)  
  Interface para cadastro de autores, livros e vendas.

### Estrutura do Banco

As tabelas do módulo de livraria utilizam UUID como chave primária:

- **autores:** (`id`, `nome`, `nacionalidade`)
- **livros:** (`id`, `titulo`, `ano_publicacao`, `preco`, `id_autor`)
- **vendas:** (`id`, `id_livro`, `data_venda`, `quantidade`)

### API REST

O módulo de livraria disponibiliza os seguintes endpoints:

- `GET /api/livraria/autores` - Lista todos os autores
- `GET /api/livraria/livros` - Lista todos os livros
- `GET /api/livraria/vendas` - Lista todas as vendas
- `POST /api/livraria/autores` - Cadastra novo autor
- `POST /api/livraria/livros` - Cadastra novo livro
- `POST /api/livraria/vendas` - Registra nova venda

### Script de Inicialização

O arquivo `src/scripts/init.sql` contém todas as definições do banco de dados.
Execute-o após criar o banco:

```bash
psql -U seu_usuario -d seu_banco -f src/scripts/init.sql
```

## MVC

- Backend Node.js com Express e PostgreSQL, seguindo o padrão MVC.
- Views EJS para interface visual: lista de tarefas e formulário de cadastro.
- Integração real com banco de dados: tarefas exibidas e cadastradas diretamente no PostgreSQL.
- Estilização básica com CSS.
- Rotas REST para API e rotas para páginas HTML/EJS.

## Como acessar as páginas do sistema

1. **Inicie o servidor:**
   ```bash
   npm start
   ```

2. **Acesse no navegador:**
   - **Dashboard da Livraria:**  
     [http://localhost:3000/livraria](http://localhost:3000/livraria)
   - **Cadastros da Livraria:**  
     [http://localhost:3000/livraria/novo](http://localhost:3000/livraria/novo)

3. **Os dados cadastrados aparecem automaticamente nas listagens.**

## Scripts Disponíveis

- `npm start`: Inicia o servidor Node.js.
- `npm run dev`: Inicia o servidor com nodemon (auto-reload durante o desenvolvimento).
- `npm run init-db`: Executa a criação do esquema do banco de dados.

## Estrutura de Diretórios

```bash
taskmanager/
├── config/              # Configurações gerais e do banco de dados
├── controllers/         # Controladores da aplicação (lógica de negócio)
├── models/              # Modelos (definições e interações com o banco)
├── routes/              # Rotas da aplicação
├── views/               # Views EJS (se aplicável)
├── tests/               # Testes automatizados
├── src/assets/          # Recursos estáticos (incluindo o diagrama do banco)
├── server.js            # Arquivo principal do servidor
├── .env                 # Variáveis de ambiente (não incluso por padrão)
├── package.json         # Configurações e dependências do projeto
└── readme.md            # Documentação do projeto
```

## Modelo do Banco de Dados

O banco de dados relacional utiliza PostgreSQL e está composto pelas seguintes tabelas e relacionamentos:

### Tabelas

- **users:** Armazena dados de usuários (`id`, `username`, `email`, `role`)
- **categories:** Categorias de tarefas (`id`, `name`, `description`)
- **tasks:** Tarefas criadas pelos usuários (`id`, `title`, `description`, `status`, `priority`, `user_id`, `category_id`)
- **comments:** Comentários em tarefas (`id`, `task_id`, `user_id`, `content`)

### Relacionamentos

- Cada tarefa pertence a um usuário (`tasks.user_id` → `users.id`)
- Cada tarefa pode estar associada a uma categoria (`tasks.category_id` → `categories.id`)
- Cada comentário pertence a um usuário e a uma tarefa (`comments.user_id` → `users.id`, `comments.task_id` → `tasks.id`)

### Diagrama

O diagrama do banco de dados está disponível em formato PDF na pasta `src/assets`:

[Visualizar diagrama do banco de dados (PDF)](src/assets/modelo-banco.pdf)

## Novas Tabelas e Funcionalidades (Livraria)

Além das funcionalidades de tarefas, o sistema agora possui visualização para as seguintes entidades de uma livraria:

- **autores:** Armazena autores de livros (`id`, `nome`, `nacionalidade`)
- **livros:** Armazena livros cadastrados (`id`, `titulo`, `ano_publicacao`, `preco`, `id_autor`)
- **vendas:** Registra vendas de livros (`id`, `id_livro`, `data_venda`, `quantidade`)

As tabelas utilizam UUID como chave primária.

### Como visualizar os dados

- **Lista de autores:**  
  [http://localhost:3000/autores](http://localhost:3000/autores)
- **Lista de livros:**  
  [http://localhost:3000/livros](http://localhost:3000/livros)
- **Lista de vendas:**  
  [http://localhost:3000/vendas](http://localhost:3000/vendas)

### Script de criação das tabelas (init.sql)

Veja o arquivo `src/scripts/init.sql` para o script completo de criação das tabelas:

```sql
-- Ativar extensão de UUID, se ainda não estiver ativa
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar tabela de Autores
CREATE TABLE autores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    nacionalidade VARCHAR(50)
);

-- Criar tabela de Livros
CREATE TABLE livros (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(150) NOT NULL,
    ano_publicacao INT,
    preco NUMERIC(10, 2),
    id_autor UUID REFERENCES autores(id)
);

-- Criar tabela de Vendas
CREATE TABLE vendas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    id_livro UUID REFERENCES livros(id),
    data_venda DATE,
    quantidade INT
);
```

## Tratamento de Erros e Troubleshooting

### Erros Comuns

1. **Erro de Conexão com Banco:**
   ```bash
   # Verifique as credenciais no .env
   # Teste a conexão manualmente:
   psql -U seu_usuario -d seu_banco -h localhost
   ```

2. **Erros de Runtime:**
   - Verifique os logs em `/logs/error.log`
   - Use o modo debug: `DEBUG=app:* npm start`

3. **Problemas de Performance:**
   - Monitore queries lentas no PostgreSQL
   - Verifique o uso de memória com `node --inspect`

### Validação Frontend

- Validação em tempo real dos formulários
- Feedback visual imediato
- Mensagens de erro claras e acionáveis

### Logs e Monitoramento

- Logs estruturados em JSON
- Rotação de logs automática
- Monitoramento de métricas básicas

## Licença

Este projeto está licenciado sob a Licença MIT.