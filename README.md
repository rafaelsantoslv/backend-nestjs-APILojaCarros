# Projeto de API para Gerenciamento de Carros e Usuários

Este projeto é uma API desenvolvida em Nest.js para gerenciar informações sobre carros e usuários.

## Instalação

Para executar este projeto localmente, siga estas etapas:

1. Clone este repositório em sua máquina local:


2. Navegue até o diretório do projeto:


3. Instale as dependências do projeto:


4. Configure as variáveis de ambiente. Você pode copiar o arquivo `.env.example` para `.env` e ajustar as configurações conforme necessário.

5. Inicie o servidor de desenvolvimento:


6. Acesse a API em `http://localhost:3000`.

## Funcionalidades

### CRUD de Carros

- **Listar Carros**: GET `/cars`
- **Buscar Carro por ID**: GET `/cars/:id`
- **Criar Carro**: POST `/cars`
- **Atualizar Carro**: PUT `/cars/:id`
- **Remover Carro**: DELETE `/cars/:id`

### CRUD de Usuários (A ser implementado)

- **Listar Usuários**: GET `/users`
- **Buscar Usuário por ID**: GET `/users/:id`
- **Criar Usuário**: POST `/users`
- **Atualizar Usuário**: PUT `/users/:id`
- **Remover Usuário**: DELETE `/users/:id`

## Documentação da API

A documentação completa da API está disponível em `http://localhost:3000/api-docs`.

## Tecnologias Utilizadas

- [Nest.js](https://nestjs.com/)
- [Sequelize](https://sequelize.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Contribuindo

Se você quiser contribuir para este projeto, por favor siga estas etapas:

1. Faça um fork do projeto.
2. Crie uma branch para sua nova funcionalidade (`git checkout -b feature/nova-funcionalidade`).
3. Faça commit de suas alterações (`git commit -am 'Adiciona nova funcionalidade'`).
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`).
5. Crie um novo Pull Request.

## Licença

Este projeto é licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
