import express from "express";
import dotenv from "dotenv";
dotenv.config();
export const config = {
  jwtKey: process.env.JWT_KEY,
  port: process.env.PORT,
  userFile: process.env.USER_FILE,
  expiresIn: process.env.EXPIRES_IN,
  refreshExpires: process.env.REFRESH_EXPIRES,
};

const app = express();

export default app;
