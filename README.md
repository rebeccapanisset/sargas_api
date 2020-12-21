# SARGAS

Este projeto foi realizado para para facilitar a gerência, controle e geração de contratos de venda de tanques de armazenamento para uma empresa.

Antigamente tais tarefas eram realizadas manualmente por parte do contratante, que editava arquivos de texto a cada novo tanque gerado.

Agora, por meio da plataforma, foram automatizados os sequintes tópicos:

1. Manipulação de Usuários
2. Manipulação de Clientes
3. Manipulação de Caminhões
4. Manipulação de Produtos (Tanques de Combustível, Aéreo, Pipa e Caixa D'Água)
5. Acesso autenticado
6. Geração de Orçamento
7. Negociação de Orçamento
8. Envio do Orçamento por e-mail
9. Geração de Contrato
10. Configurações de funcionamento para a plataforma
11. Personalização do documento de orçamento e contrato
12. Arquivamento e expiração de orçamentos automático.
13. Desarquivamento de orçamento manual.

## Tecnologias Utilizadas

* AdonisJS
* PostgreSQL
* Redis
* Sentry
* adonis-kue (https://github.com/nrempel/adonis-kue)
* handlebars (https://github.com/handlebars-lang/handlebars.js)
* pdf-creator-node (https://github.com/hajareshyam/pdf-creator-node)
* adonis-scheduler (https://github.com/nrempel/adonis-scheduler)

## Como Instalar e Executar

1. ``` git clone https://github.com/rebeccapanisset/sargas_api.git ```
2. Entre na pasta do projeto ``` cd github-explorer ```
3. ``` yarn install ``` (para instalar todas as dependências)

### Configurando .env

1. Faça uma cópia do arquivo base ``` .env.example ``` e renomeie para ``` .env ```
2. Preencha o arquivo ``` .env ``` com as informações necessárias
3. Execute o comando ``` adonis key:generate ``` para gerar a chave da aplicação

### Banco de Dados e Migrations

1. Crie um banco (PostgreSQL) com o nome de sargas
2. Execute o comando ``` adonis migration:run ``` para criar as tabelas no banco
3. Execute o comando ``` adonis seed ``` para criar o usuário administrador (as credenciais do administrador são informadas no .env)

### Execução

1. Execute o comando ``` adonis serve ``` para iniciar o servidor, ou ``` adonis serve --dev ``` para o modo de desenvolvimento
2. Execute o comando ``` adonis kue:listen ``` para iniciar o gerenciador de kues
3. Execute o comando ``` node ace run:scheduler ``` para executar o schedule

