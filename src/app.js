import app from "./config/app.js";
import authRoutes from "./routes/authRoutes.js";

const PORT = process.env.PORT || 3000;

// Rotas
app.use("/auth", authRoutes);
app.use("");

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
