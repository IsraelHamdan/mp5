export function requireAdmin(req, res, next) {
  const unprotectedRoutes = ["/login"];
  if (unprotectedRoutes.includes(req.path)) return next();

  const userProfile = req.user?.profile;
  if (!userProfile || userProfile !== "admin") {
    return res.status(403).json({
      message: "Acesso negado: Apenas administradores podem acessar.",
    });
  }
  console.info("Acesso concedido");
  next();
}
