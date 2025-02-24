require("dotenv").config();

module.exports = {
  databaseUrl: process.env.DATABASE_URL, // Pega a URL do banco do .env
  migrationsTable: "migrations", // Tabela onde serão armazenadas as migrations aplicadas
  dir: "migrations", // Pasta onde serão armazenadas as migrations
  schema: "public", // Schema do banco (pode ser alterado se necessário)
};