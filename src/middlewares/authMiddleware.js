import { validateToken } from "../services/authService.js";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split("")[1];
  console.log("🚀 ~ authenticateToken ~ token:", token);

  if (!token)
    return res.status(401).json({
      message: "Token ausente",
    });

  const user = validateToken(token);
  console.log("🚀 ~ authenticateToken ~ user:", user);

  if (!user) {
    return res.status(403).json({
      message: "Unauthorized, token is invalid",
    });
  }

  req.user = user;
  console.log("Middleware executado");
  next();
};
