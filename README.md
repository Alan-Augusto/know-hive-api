# 📘 **Documentação da API**

Esta é a documentação básica da estrutura e funcionamento da API desenvolvida com **Node.js + TypeScript**. A API segue uma arquitetura organizada baseada em **controllers, services e repositories**, além de contar com uma **documentação automatizada via Swagger**.

---

## 📂 **Estrutura de Pastas**

```
/my-api
│-- /src
│   │-- /config            # Configuração do banco de dados
│   │   ├── database.ts    # Conexão com PostgreSQL
│   │-- /entities          # Definição dos modelos (classes TypeScript)
│   │   ├── user.ts        # Modelo do usuário
│   │   ├── question.ts    # Modelo da questão
│   │-- /controllers       # Controladores (definem os endpoints)
│   │   ├── user.controller.ts       # Endpoints do usuário
│   │   ├── question.controller.ts   # Endpoints da questão
│   │-- /services          # Serviços (regras de negócio)
│   │   ├── user.service.ts       # Lógica de usuário
│   │   ├── question.service.ts   # Lógica de questão
│   │-- /repositories      # Repositórios (conexão com o banco)
│   │   ├── user.repository.ts      # Acesso ao banco (usuários)
│   │   ├── question.repository.ts  # Acesso ao banco (questões)
│   │-- /routes            # Definição das rotas
│   │   ├── user.routes.ts       # Rotas do usuário
│   │   ├── question.routes.ts   # Rotas da questão
│   │-- /decorators        # Decorators personalizados
│   │   ├── apiDoc.ts      # Decorator para documentação do Swagger
│   │-- /services
│   │   ├── swaggerGenerator.ts  # Geração automática da documentação Swagger
│   │-- /docs
│   │   ├── swagger.ts     # Configuração do Swagger
│   │-- app.ts             # Configuração principal da aplicação
│   │-- server.ts          # Inicializa o servidor
│-- /node_modules          # Dependências do projeto
│-- .env                   # Variáveis de ambiente (ex: conexão com o banco)
│-- package.json           # Dependências e scripts do projeto
│-- tsconfig.json          # Configuração do TypeScript
│-- README.md              # Documentação do projeto (este arquivo)
```

---

## 🚀 **Funcionamento da API**

### 📌 **1. Controladores (`/controllers`)**
Os controladores são responsáveis por **definir os endpoints** da API. Eles recebem as requisições e chamam os serviços para processar os dados.

Exemplo:
```ts
@Get("/users")
async getAllUsers(req: Request, res: Response) {
    const users = await this.userService.getUsers();
    res.json(users);
}
```

---

### 📌 **2. Serviços (`/services`)**
Os serviços contêm **a lógica de negócio** da aplicação. Eles processam os dados e chamam os repositórios para acessar o banco.

Exemplo:
```ts
export class UserService {
  private userRepository = new UserRepository();

  async getUsers() {
    return await this.userRepository.findAll();
  }
}
```

---

### 📌 **3. Repositórios (`/repositories`)**
Os repositórios são responsáveis **pela comunicação com o banco de dados**, executando as consultas SQL.

Exemplo:
```ts
export class UserRepository {
  async findAll(): Promise<User[]> {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  }
}
```

---

### 📌 **4. Rotas (`/routes`)**
As rotas definem quais **endpoints estarão disponíveis** e quais controladores serão chamados.

Exemplo:
```ts
router.get("/", (req, res) => userController.getAllUsers(req, res));
```

---

### 📌 **5. Decorators (`/decorators`)**
Os decorators são usados para **automatizar a geração da documentação**.

Exemplo:
```ts
@ApiDoc({
  method: "get",
  path: "/users",
  description: "Retorna todos os usuários cadastrados.",
  output: User,
})
```

---

### 📌 **6. Swagger e Documentação (`/docs` e `swaggerGenerator.ts`)**
A API gera automaticamente a documentação Swagger a partir dos decorators.

📌 **Para acessar a documentação, inicie o servidor e acesse:**
```
http://localhost:3000/api-docs
```

---

## 🎯 **Como Rodar o Projeto**
### ✅ **1. Instalar as Dependências**
```sh
npm install
```

### ✅ **2. Configurar as Variáveis de Ambiente (`.env`)**
Crie um arquivo `.env` na raiz do projeto e adicione a **connection string** do banco de dados:

```
DATABASE_URL=postgresql://user:password@host:port/database
```

### ✅ **3. Iniciar o Servidor**
```sh
npm run dev
```

📌 **A API estará rodando em:**  
```
http://localhost:3000
```

📌 **A documentação estará em:**  
```
http://localhost:3000/api-docs
```

---

## 🛠 **Principais Tecnologias Utilizadas**
- **Node.js + Express** → Backend e gerenciamento de rotas
- **TypeScript** → Tipagem e segurança no código
- **PostgreSQL** → Banco de dados
- **Swagger** → Documentação automática da API
- **Decorators TypeScript** → Automação da documentação

---

## 🎉 **Conclusão**
Esta API foi desenvolvida para ser **modular e escalável**, facilitando a manutenção e a criação de novos recursos. Qualquer dúvida, basta seguir a estrutura descrita acima! 🚀

Se precisar de mais alguma coisa, só avisar! 😃🔥#   k n o w - h i v e - a p i  
 