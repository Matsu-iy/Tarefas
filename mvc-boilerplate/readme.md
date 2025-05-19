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

**Instalar as dependências:**
```bash
npm install
```

**Configurar o arquivo `.env`:**

Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente necessárias, como as credenciais do banco de dados PostgreSQL.

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

## Licença

Este projeto está licenciado sob a Licença MIT.