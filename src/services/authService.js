import jwt from "jsonwebtoken";
import users from "../models/userData.json" assert { type: "json" };

const JWT_KEY = process.env.JWT_KEY;

export const generete = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    JWT_KEY,
    { expiresIn: process.env.EXPIRES_IN | "1h" }
  );
};

export const validateToken = (token) => {
  try {
    return jwt.verify(token, JWT_KEY);
  } catch (err) {
    return null;
  }
};

export const findUser = (username, password) => {
  return users.find(
    (user) => user.username === username && user.password === password
  );
};
