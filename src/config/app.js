import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware para processar JSON
app.use(express.json());

export default app;
