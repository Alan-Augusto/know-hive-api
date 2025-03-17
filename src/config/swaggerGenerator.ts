import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { UserController } from "../controllers/user.controller";
import { QuestionController } from "../controllers/question.controller";
import "reflect-metadata";

interface controllerModel {
  controller: any;
  tag: string;
}

export function generateSwaggerDocs() {
  const paths: any = {};

  // Importação dinâmica para evitar problemas de dependências circulares
  const controllers:controllerModel[] = [
    { controller: UserController, tag: "User" },
    { controller: QuestionController, tag: "Question" },
  ];

  controllers.forEach(({ controller, tag }) => {
    const controllerInstance = new controller();
    const methods = Object.getOwnPropertyNames(controller.prototype).filter(m => m !== "constructor");

    methods.forEach((method) => {
      const handler = controllerInstance[method as keyof typeof controller];
      const description = Reflect.getMetadata("swagger:description", handler);
      const params = Reflect.getMetadata("swagger:params", handler) || [];

      // Definindo a rota com a tag
      paths[`/${controller.name.toLowerCase()}s/${method}`] = {
        get: {
          summary: description || "",
          tags: [tag], // Aqui está a definição da tag para cada rota
          parameters: params.map((p: any) => ({
            name: p.name,
            in: "path",
            required: p.required,
            schema: { type: p.type }
          })),
          responses: {
            200: { description: "OK" },
            400: { description: "Bad Request" },
            500: { description: "Internal Server Error" }
          }
        }
      };
    });
  });

  return {
    openapi: "3.0.0",
    info: {
      title: "API KnowHive",
      version: "1.0.0",
      description: "Documentação da API usando Swagger",
    },
    servers: [{ url: "http://localhost:3000" }],
    paths,
  };
}



const swaggerSpec = generateSwaggerDocs();

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
