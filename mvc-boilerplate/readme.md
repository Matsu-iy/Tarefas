# MVC Boilerplate

Teste básico utilizando o padrão arquitetural MVC com Node.js e Express.

# Introdução

Este projeto é um boilerplate para aplicações web que seguem o padrão arquitetural **MVC (Model-View-Controller)**. Ele foi desenvolvido com **Node.js** e **Express**, oferecendo uma estrutura organizada para separar responsabilidades entre lógica de negócios, apresentação e manipulação de dados. Ideal para quem deseja iniciar rapidamente um projeto com boas práticas de organização.

# Descrição do Sistema

O sistema é uma aplicação web simples que segue o padrão MVC para organizar o código em camadas de tarefas. Ele inclui suporte para rotas, controladores e modelos, permitindo uma separação clara entre lógica de negócios, lógica de apresentação e difusão de dados.

# Estrutura de Pastas e Arquivos

```
mvc-boilerplate/
routes/
─ index.js       # Arquivo de rotas principais
controllers/
─ homeController.js # Controlador para a rota inicial
models/
─ exampleModel.js   # Exemplo de modelo de dados
views/
─ index.ejs      # Página inicial renderizada
server.js          # Arquivo principal do servidor
readme.md          # Documentação do projeto
package.json       # Dependências e configurações do projeto
```

# Diagrama do Banco de Dados

# O projeto utiliza um banco de dados simples para armazenar informações. Abaixo está um exemplo de diagrama para ilustrar a estrutura básica:

Users
- id (PK)
- name
- email
- password

# **Nota:** Este é apenas um exemplo. Certifique-se de ajustar o diagrama conforme a estrutura real do banco de dados utilizada no projeto.

# Como Executar o Projeto Localmente

1. # Pré-requisitos:
   - Node.js instalado na máquina;
   - Gerenciador de pacotes `npm`;

2. # Instalar Dependências:
   No diretório raiz do projeto, execute:
   ```bash
   npm install
   ```

3. # Iniciar o Servidor:
   Execute o comando:
   ```bash
   npm start
   ```
   O servidor estará disponível em `http://localhost:3000`.
