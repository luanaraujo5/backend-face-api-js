# 🎭 Face Recognition API

API backend para reconhecimento facial usando Node.js, TypeScript, Express e SQLite.

## 📋 Descrição

Esta API permite cadastrar pessoas através de embeddings faciais e realizar verificações de identidade. Utiliza a biblioteca face-api.js para processamento das características faciais e armazena os dados em SQLite.

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 18+
- npm

### Instalação
```bash
npm install
```

### Executar em desenvolvimento
```bash
npm run dev
```

### Build para produção
```bash
npm run build
npm start
```

### Executar migrações
```bash
npm run migrate
```

## 🏗️ Arquitetura

```
src/
├── app.ts              # Configuração do Express
├── server.ts           # Servidor HTTP
├── config/
│   └── db.ts           # Configuração SQLite
├── controllers/
│   └── people.controller.ts
├── services/
│   └── people.service.ts
├── repositories/
│   └── people.repo.ts
├── routes/
│   └── people.routes.ts
├── middlewares/
│   ├── error.ts
│   └── notFound.ts
└── utils/
    └── embeddings.ts   # Utilitários para embeddings
```

## 📡 Endpoints

### Health Check
```http
GET /health
```

### Cadastrar Pessoa
```http
POST /api/register
Content-Type: application/json

{
  "name": "Nome da Pessoa",
  "embeddings": [[0.1, 0.2, ...], [0.3, 0.4, ...]]
}
```

### Listar Pessoas
```http
GET /api/people
```

### Remover Pessoa
```http
DELETE /api/person/:name
```

## 🔧 Configuração

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
CORS_ORIGIN=http://localhost:4200
```

### CORS
Configure as origens permitidas na variável `CORS_ORIGIN` (separadas por vírgula):
```env
CORS_ORIGIN=http://localhost:4200,https://meuapp.com
```

## 🗄️ Banco de Dados

Utiliza SQLite com a seguinte estrutura:

```sql
CREATE TABLE people (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT UNIQUE NOT NULL,
  embeddings TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

O banco é criado automaticamente em `data/db.sqlite`.

## 🛡️ Segurança

- **Helmet**: Cabeçalhos de segurança HTTP
- **CORS**: Controle de origens permitidas
- **Validação**: Dados de entrada validados
- **Rate Limiting**: Limite de 10MB para uploads

## 🧪 Testando a API

### Usando cURL

**Health Check:**
```bash
curl http://localhost:3000/health
```

**Cadastrar pessoa:**
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "embeddings": [[0.1, 0.2, 0.3], [0.4, 0.5, 0.6]]
  }'
```

**Listar pessoas:**
```bash
curl http://localhost:3000/api/people
```

### Usando Postman

Importe a coleção `coleção.json` no Postman para ter todos os endpoints pré-configurados.

## 📊 Embeddings

Os embeddings faciais são arrays de números que representam as características únicas de um rosto. Esta API:

- Aceita múltiplos embeddings por pessoa (para melhor precisão)
- Armazena embeddings como JSON no SQLite
- Calcula distância euclidiana para verificação

## 🔍 Estrutura dos Dados

### Pessoa cadastrada
```json
{
  "id": 1,
  "name": "João Silva",
  "embeddings": "[[0.1,0.2,0.3],[0.4,0.5,0.6]]",
  "created_at": "2024-01-01T10:00:00.000Z"
}
```

### Resposta de cadastro
```json
{
  "message": "Pessoa cadastrada com sucesso",
  "person": {
    "id": 1,
    "name": "João Silva",
    "created_at": "2024-01-01T10:00:00.000Z"
  }
}
```

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Tipagem estática
- **Express** - Framework web
- **SQLite** - Banco de dados
- **better-sqlite3** - Driver SQLite
- **CORS** - Cross-Origin Resource Sharing
- **Helmet** - Segurança HTTP
- **Morgan** - Logger de requisições

## 📝 Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento com watch
npm run build    # Build TypeScript
npm start        # Produção (após build)
npm run migrate  # Executar migrações do banco
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC.

---

**Desenvolvido com ❤️ usando Node.js + TypeScript + Express**
