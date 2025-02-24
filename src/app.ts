import express from 'express';
import { setupSwagger } from './docs/swagger';
import userRoutes from './routes/user.routes';
import questionRoutes from './routes/question.routes';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Rotas
app.use('/users', userRoutes);
app.use('/questions', questionRoutes);

// Configurar Swagger
setupSwagger(app);

export default app;
