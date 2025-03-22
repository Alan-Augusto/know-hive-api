import cors from 'cors';
import questionController from "./controllers/question.controller";
import userController from "./controllers/user.controller";

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const express = require('express')

const app = express()
// Middleware para parsing de JSON
app.use(express.json());
// Configurar CORS para permitir requisições de qualquer origem (ajustável conforme necessidade)
app.use(cors({
    origin: 'http://localhost:4200',  // Permitir requisições apenas de localhost:4200 (frontend)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Ajuste os métodos conforme necessário
}));


// Entidades
app.use('/users', userController);
app.use('/questions', questionController);

// Documentação
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

export default app;
