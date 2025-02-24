import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { routesDocumentation } from "../decorators/apiDoc";

export function generateSwaggerDoc(app: Express) {
  const swaggerDocument: any = {
    openapi: "3.0.0",
    info: {
      title: "API Documentação Automática",
      description: "Documentação gerada a partir de decorators e classes TypeScript",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local",
      },
    ],
    paths: {},
    components: { schemas: {} }, // Aqui serão armazenados os modelos
  };

  routesDocumentation.forEach((route) => {
    if (!swaggerDocument.paths[route.path]) {
      swaggerDocument.paths[route.path] = {};
    }

    const outputSchema = route.output
      ? {
          type: "object",
          properties: Object.fromEntries(
            Object.entries(new route.output()).map(([key, value]) => [
              key,
              { type: typeof value },
            ])
          ),
        }
      : {};

    // Adiciona o modelo ao Swagger automaticamente
    if (route.output) {
      swaggerDocument.components.schemas[route.output.name] = outputSchema;
    }

    swaggerDocument.paths[route.path][route.method] = {
      summary: route.description || "Sem descrição",
      responses: {
        200: {
          description: "Resposta bem-sucedida",
          content: {
            "application/json": {
              schema: {
                $ref: `#/components/schemas/${route.output.name}`, // Usa referência automática!
              },
            },
          },
        },
      },
    };
  });

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
