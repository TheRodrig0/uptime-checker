# uptime-checker

[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Fastify](https://img.shields.io/badge/Fastify-000000?style=for-the-badge&logo=fastify&logoColor=white)](https://www.fastify.io/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![tsx](https://img.shields.io/badge/tsx-blue?style=for-the-badge)](https://tsx.is/)

## Sobre
Uptime Checker é um aplicativo web que verifica a disponibilidade de um servidor ou site e envia um e-mail quando o status muda.

--- 

## 🚀 Como Executar o Projeto

Siga os passos abaixo para configurar e executar a aplicação no seu ambiente local.

### **Pré-requisitos**

- **[Node.js](https://nodejs.org/)** (v18+)
- **[npm](https://www.npmjs.com/)** ou **[yarn](https://yarnpkg.com/)**

### Backend

```bash
# Navegue para a pasta do backend
cd backend

# Instale as dependências
npm install

# Execute a api
npm run dev
```

### Testes

Para garantir a qualidade e a integridade do código, o projeto inclui testes automatizados.

**Para rodar os testes do backend:**

```bash
# Navegue para a pasta do backend
cd backend

# Execute os testes
npm test
```
### Endpoints
| Método | Rota | Descrição |
|---|---|---|
| GET | `/monitor` | Lista todos os monitores |
| GET | `/monitor/:id` | Obtém um monitor específico |
| POST | `/monitor` | Cria um novo monitor |
| PATCH | `/monitor/:id` | Atualiza um monitor existente |
| DELETE | `/monitor/:id` | Remove um monitor |

---
