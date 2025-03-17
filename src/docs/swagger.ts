import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { generateSwaggerDocs } from "../config/swaggerGenerator";

export const setupSwagger = (app: Express) => {
  const swaggerSpec = generateSwaggerDocs(); // Gera a documentação
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
