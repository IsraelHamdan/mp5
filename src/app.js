import app from "./config/config.js";
import authRoutes from "./routes/authRoutes.js";
import { config } from "./config/config.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import express from "express";
import { requireAdmin } from "./middlewares/roleMiddlewere.js";
import contracRoutes from "./routes/contractRoutes.js";
import userRoutes from "./routes/userRoutes.js";

app.use(express.json());

app.use("/auth", authRoutes);

app.use(authMiddleware);
app.use(requireAdmin);
app.use("/user", userRoutes);
app.use("/contracts", contracRoutes);

app.listen(config.port, () => {
  console.log(`Servidor rodando em http://localhost:${config.port}`);
});
