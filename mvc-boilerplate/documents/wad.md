# Web Application Document - Projeto Individual - Módulo 2 - Inteli

**Nome do Projeto:** TaskManager  
**Autor do projeto:** Enzo Matsui

## Sumário

1. [Introdução](#introdução)
2. [Visão Geral da Aplicação Web](#visão-geral-da-aplicação-web)
3. [Projeto Técnico da Aplicação Web](#projeto-técnico-da-aplicação-web)
4. [Desenvolvimento da Aplicação Web](#desenvolvimento-da-aplicação-web)
5. [Referências](#referências)

# Introdução

O **TaskManager** é uma aplicação web para gerenciamento de tarefas, desenvolvida utilizando **Node.js** com **Express.js** e **PostgreSQL**, seguindo o padrão arquitetural **MVC** (Model-View-Controller).

O objetivo do sistema é permitir que usuários organizem e acompanhem tarefas de forma eficiente, promovendo organização pessoal e produtividade. Os usuários podem criar tarefas, classificá-las por categorias, atribuir prioridades, acompanhar seu status e adicionar comentários, sendo ideal para projetos acadêmicos e pessoais.

A proposta surgiu da motivação pessoal de coletar citações que despertam reflexões, inspiram ações ou simplesmente merecem ser guardadas. O sistema funciona como um acervo pessoal de frases, em que cada usuário pode cadastrar pensamentos, atribuí-los a autores e classificá-los por temas específicos.

A aplicação será desenvolvida com Node.js e Express.js, utilizando a arquitetura MVC. A visualização será renderizada com EJS, e o banco de dados relacional será estruturado em PostgreSQL, com entidades como usuários, frases, autores e tópicos.

O objetivo é criar uma plataforma funcional para armazenar e organizar frases, incentivando a curadoria de conteúdo textual. O projeto também consolida os conhecimentos adquiridos em desenvolvimento web, como modularização, rotas e interação com banco de dados.

# Visão Geral da Aplicação Web
2.1. Personas (Semana 01 - opcional)
Posicione aqui sua(s) Persona(s) em forma de texto markdown com imagens, ou como imagem de template preenchido. Atualize esta seção ao longo do módulo se necessário.

2.2. User Stories (Semana 01 - opcional)
Posicione aqui a lista de User Stories levantadas para o projeto. Siga o template de User Stories e utilize a referência USXX para numeração (US01, US02, US03, ...). Indique todas as User Stories mapeadas, mesmo aquelas que não forem implementadas ao longo do projeto. Não se esqueça de explicar o INVEST de 1 User Storie prioritária.

# Projeto da Aplicação Web

A aplicação foi estruturada para facilitar o gerenciamento de tarefas por meio de uma interface intuitiva e recursos completos. O sistema permite o cadastro de usuários, criação e acompanhamento de tarefas, classificação por categorias, definição de prioridades e status, além de um sistema de comentários para comunicação entre usuários. O backend foi implementado em Node.js com Express.js, utilizando PostgreSQL como banco de dados relacional, e segue o padrão MVC para separar responsabilidades entre modelos, controladores e rotas.

Principais funcionalidades:
- Cadastro e autenticação de usuários, com diferentes níveis de acesso (campo `role`).
- Gerenciamento completo de tarefas: criação, atualização, visualização e remoção.
- Classificação de tarefas por categorias, com nome e descrição.
- Definição de prioridades (`low`, `medium`, `high`) e status (`pending`, `in_progress`, `completed`).
- Sistema de comentários para interação entre usuários em cada tarefa.
- Relacionamentos claros entre usuários, tarefas, categorias e comentários.

## 3.1. Modelagem do banco de dados

O banco de dados utiliza o PostgreSQL e foi modelado para garantir integridade e eficiência nos relacionamentos entre as entidades principais do sistema. A seguir, a estrutura das tabelas e seus relacionamentos:

### Tabelas

- **users:** Armazena dados dos usuários (`id`, `username`, `email`, `role`)
- **categories:** Categorias de tarefas (`id`, `name`, `description`)
- **tasks:** Tarefas criadas pelos usuários (`id`, `title`, `description`, `status`, `priority`, `user_id`, `category_id`)
- **comments:** Comentários em tarefas (`id`, `task_id`, `user_id`, `content`)

### Relacionamentos

- Cada tarefa pertence a um usuário (`tasks.user_id` → `users.id`)
- Cada tarefa pode estar associada a uma categoria (`tasks.category_id` → `categories.id`)
- Cada comentário pertence a um usuário e a uma tarefa (`comments.user_id` → `users.id`, `comments.task_id` → `tasks.id`)

### Diagrama

O diagrama do banco de dados está disponível em formato PDF na pasta `src/assets`:

[Visualizar diagrama do banco de dados (PDF)](../src/assets/modelo-banco.pdf)

## 3.1.1 BD e Models (Semana 5)
Descreva aqui os Models implementados no sistema web

## 3.2. Arquitetura (Semana 5)
Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.

Instruções para criação do diagrama de arquitetura

Model: A camada que lida com a lógica de negócios e interage com o banco de dados.
View: A camada responsável pela interface de usuário.
Controller: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.

## 3.3. Wireframes (Semana 03 - opcional)
Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).

## 3.4. Guia de estilos (Semana 05 - opcional)
Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.

## 3.5. Protótipo de alta fidelidade (Semana 05 - opcional)
Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).

## 3.6. WebAPI e endpoints (Semana 05)
Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.

# 3.7 Interface e Navegação (Semana 07)
Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.

# 4. Desenvolvimento da Aplicação Web (Semana 8)
4.1 Demonstração do Sistema Web (Semana 8)
VIDEO: Insira o link do vídeo demonstrativo nesta seção Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.

## 4.2 Conclusões e Trabalhos Futuros (Semana 8)
Indique pontos fortes e pontos a melhorar de maneira geral. Relacione também quaisquer outras ideias que você tenha para melhorias futuras.

# 5. Referências
Incluir as principais referências de seu projeto, para que o leitor possa consultar caso ele se interessar em aprofundar.