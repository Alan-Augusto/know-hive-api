import swaggerUi from "swagger-ui-express";

const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API Documentação",
    description: "Documentação da API sem dependência de terceiros",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor Local",
    },
  ],
  paths: {
    "/users": {
      get: {
        summary: "Retorna todos os usuários",
        description: "Retorna uma lista de usuários cadastrados.",
        responses: {
          200: {
            description: "Lista de usuários retornada com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      name: { type: "string" },
                      email: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/questions": {
      get: {
        summary: "Retorna todas as questões",
        description: "Retorna uma lista de questões cadastradas.",
        responses: {
          200: {
            description: "Lista de questões retornada com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "integer" },
                      title: { type: "string" },
                      description: { type: "string" },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

const setupSwagger = (app: any) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default setupSwagger;
