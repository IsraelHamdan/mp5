import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import Joi from "joi";
import { pinoHttp } from "pino-http";
import helmet from "helmet";

dotenv.config();

const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW),
  max: parseInt(process.env.RATE_LIMIT_MAX),
  message: "Muitas requisições feitas. Tente novamente mais tarde.",
});

export const config = {
  jwtKey: process.env.JWT_KEY,
  port: process.env.PORT,
  userFile: process.env.USER_FILE,
  expiresIn: process.env.EXPIRES_IN,
  refreshExpires: process.env.REFRESH_EXPIRES,
};
const app = express();

app.use(limiter);
app.use(pinoHttp());
app.use(helmet());

export const createUserSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  email: Joi.string().required(),
  profile: Joi.string().required(),
});

export const loginSchema = Joi.object({
  username: Joi.string().required().min(3).max(30).messages({
    "string.empty": "O campo 'username' é obrigatório.",
    "string.min": "O 'username' deve ter pelo menos 3 caracteres.",
    "string.max": "O 'username' pode ter no máximo 30 caracteres.",
  }),
  password: Joi.string().required().min(6).max(128).messages({
    "string.empty": "O campo 'password' é obrigatório.",
    "string.min": "A 'senha' deve ter pelo menos 6 caracteres.",
    "string.max": "A 'senha' pode ter no máximo 128 caracteres.",
  }),
}).strict();

export default app;
