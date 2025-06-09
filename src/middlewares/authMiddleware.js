import { AuthService } from "../services/authService.js";

const auth = new AuthService();
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return res.status(401).json({
      message: "Token ausente",
    });

  const user = auth.validateToken(token);

  if (!user) {
    return res.status(403).json({
      message: "Unauthorized, token is invalid",
    });
  }

  req.user = user;
  next();
};
