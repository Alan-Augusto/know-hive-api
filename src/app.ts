import express from "express";
import userRoutes from "./routes/user.routes";
import questionRoutes from "./routes/question.routes";
import { generateSwaggerDoc } from "./services/swaggerGenerator"; // IMPORTAÇÃO CORRETA

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/questions", questionRoutes);

generateSwaggerDoc(app); // Gera a documentação automaticamente!

export default app;
