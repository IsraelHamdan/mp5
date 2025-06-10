import { AuthService } from "../services/authService.js";

const auth = new AuthService();

export const authMiddleware = (req, res, next) => {
  try {
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
  } catch (err) {
    console.error("Erro ao validar o token:", err.message);

    // Tratamento de erros do JWT
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expirado",
      });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(400).json({
        message: "Token inválido",
      });
    }
    return res.status(500).json({
      message: "Erro ao validar token",
    });
  }
};
