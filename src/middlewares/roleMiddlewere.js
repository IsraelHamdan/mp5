export const requireRole = (req, res, next) => {
  if (req.user.perfil !== "admin")
    return res.status(403).json({
      message: "Forbiden request",
    });
  next();
};
