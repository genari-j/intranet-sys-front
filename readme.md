## Intranet Sys - Front 🚀

<div align="center">

  ![Static Badge](https://img.shields.io/badge/React-61DBFB?style=for-the-badge&logo=react&labelColor=black)
  ![Static Badge](https://img.shields.io/badge/typescript-0B88F7?style=for-the-badge&logo=typescript&logoColor=0B88F7&labelColor=black)
  ![Static Badge](https://img.shields.io/badge/axios-000000?style=for-the-badge&logo=axios&logoColor=FFFFFF&labelColor=000000)
  ![Static Badge](https://img.shields.io/badge/tailwind-0B80BB?style=for-the-badge&logo=tailwind-css&logoColor=FFF&labelColor=000)
  ![Static Badge](https://img.shields.io/badge/ZOD-0822A2?style=for-the-badge&logo=zod&logoColor=%23000&labelColor=1481FC)
  ![Static Badge](https://img.shields.io/badge/tanstack%20react-FF4154?style=for-the-badge&logo=react&logoColor=white&labelColor=black)
  ![Static Badge](https://img.shields.io/badge/yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white&labelColor=000)
  ![Static Badge](https://img.shields.io/badge/biome-00B7FF?style=for-the-badge&logo=biome&logoColor=white&labelColor=000)

</div>

### 📘 Visão Geral - Front

Este Frontend foi desenvolvido utilizando Vite + React e TypeScript, com o objetivo de centralizar e unificar as funcionalidades dos principais sistemas internos de uma organização. A estrutura do projeto foi desenhada para ser modular, clara e escalável, agrupando tanto requisições quanto páginas da aplicação por domínio: Pages, API Requests, Components, Routes, e Validators.

A aplicação está utilizando como principais tecnologias: **[Vite](https://vite.dev/guide/)**, **[React](https://react.dev/learn)**, **[TypeScript](https://www.typescriptlang.org/docs/)**, **[Axios](https://axios-http.com/docs/intro)**, **[Tanstack-react](https://tanstack.com/query/latest/docs/framework/react/installation)** e **[TailwindCSS](https://tailwindcss.com/docs/installation/using-vite)**. A comunicação com a API é feita por meio de `Axios` e `Socket.IO` para atualizações necessárias em tempo real. O gerenciamento de formulários e validação é feito com `React/hookform` + `Zod`.

#### Tabela de conteúdo

- [Sistemas](#sistemas)
- [Instalação](#instalação)
- [Usabilidade](#usabilidade)
- [Autenticação](#autenticação)
- [Notificações](#notificações)

#### Sistemas

- Sistema de Chamados
- Sistema de Estoque
- Sistema de E-commerce
- Sistema de Gerenciamento de Usuários
- Sistema de Documentos
- Sistema de Notícias Corporativas
- Sistema de Registro de Ponto
- Sistema de Compras

Cada sistema possui suporte completo para as operações CRUD (Create, Read, Update, Delete), além de funcionalidades específicas, como:

- Autenticação (Sign-in/Sign-up)
- Gerenciamento de permissões por usuário
- Rotas de dashboard com dados consolidados
- Middlewares para validação, autenticação e controle de acesso

#### Instalação

1. Clone o repositório:

  - `git clone https://github.com/genari-j/intranet-sys-front.git`

2. Instale as dependências com yarn

- `yarn`

#### Usabilidade

1. Inicie a aplicação com yarn -> `yarn dev`

2. O Front ficará acessível em -> `http://localhost:5173/`
  - Caso tenha colocado outra porta, apenas altere `5173` para sua porta;

#### Autenticação

1. Para acessar a aplicação, basta utilizar o usuário administrador criado pela própria seed de usuários por parte da API:
  - Credenciais -> `Login: 00511` e `Senha: 123456`

2. O sistema está lidando com permissões de usuários. Ao criar um usuário, são definidas também suas permissões. Dependendo do nível de Tela acessada, as funcionalidades estarão liberadas somente se a permissão tiver sido concedida na criação do usuário.

#### Notificações

As notificações em tempo real são uma parte essencial do sistema, proporcionando uma comunicação instantânea entre a aplicação e os usuários. O sistema utiliza `Socket.IO` para transmitir notificações aos usuários com base em eventos específicos que acontecem dentro da aplicação. Essas notificações são disparadas de forma dinâmica e direcionada, podendo ser enviadas para um ou mais usuários dependendo da ação realizada.

1. Exemplos de Ações que Disparam Notificações:

  - Notícias: Quando uma nova notícia é cadastrada no sistema, todos os usuários que têm acesso à plataforma recebem uma notificação.
  - Chamados: Quando um chamado é aberto por qualquer usuário, as pessoas envolvidas no processo (ex: solicitante, equipe responsável) recebem uma notificação.
  - Mudanças: Sempre que há uma atualização em um chamado (como mudança de status, atribuição de um responsável, etc.), todos os usuários envolvidos recebem notificações.
  - Compras: Quando uma solicitação de compra é registrada, as partes envolvidas no processo (responsável pela aprovação ou a equipe de compras) recebem uma notificação.