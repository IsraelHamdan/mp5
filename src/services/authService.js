import jwt from "jsonwebtoken";
import users from "../models/userData.json" with {type: 'json'};
import { config } from "../config/config.js";

export const genereteToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      perfil: user.profile,
    },
    config.jwtKey,
    { expiresIn: config.expiresIn || "2h" }
  );
};

export const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwtKey);
    return decoded; 
  } catch (err) {
    return null; 
  }
};


export const findUser = (username, password) => {
  return users.find(
    (user) => user.username === username && user.password === password
  );
};
