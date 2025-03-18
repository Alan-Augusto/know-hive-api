import questionRoutes from "./routes/question.routes";
import userRoutes from "./routes/user.routes";


const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./swagger-output.json')
const express = require('express')
const app = express()


// Entidades
app.use('/users', userRoutes);
app.use('/questions', questionRoutes);

// Documentação
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

export default app;

function cors(): any {
    throw new Error("Function not implemented.");
}
