import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export class AuthService {
  genereteToken(user) {
    console.log("🚀 ~ genereteToken ~ user:", user);
    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        profile: user.profile,
      },
      config.jwtKey,
      { expiresIn: config.expiresIn || "2h" }
    );
  }
  validateToken(token) {
    try {
      const decoded = jwt.verify(token, config.jwtKey);
      return decoded;
    } catch (err) {
      return null;
    }
  }
}
