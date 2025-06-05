import app from "./config/config.js";
import authRoutes from "./routes/authRoutes.js";
import { config } from "./config/config.js";
import { authenticateToken } from "./middlewares/authMiddleware.js";
import express from "express";

app.use(express.json());

app.use("/auth", authRoutes);

app.use(authenticateToken);

app.listen(config.port, () => {
  console.log(`Servidor rodando em http://localhost:${config.port}`);
});
