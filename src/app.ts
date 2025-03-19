import questionController from "./controllers/question.controller";
import userController from "./controllers/user.controller";

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const express = require('express')

const app = express()
// Middleware para parsing de JSON
app.use(express.json());

// Entidades
app.use('/users', userController);
app.use('/questions', questionController);

// Documentação
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

export default app;

function cors(): any {
    throw new Error("Function not implemented.");
}
