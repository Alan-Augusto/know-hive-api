import app from "./app";

import questionRoutes from "./routes/question.routes";
import userRoutes from "./routes/user.routes";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Acesse a documentação em: http://localhost:${PORT}/doc`);
});