import { generateToken, findUser } from "../services/authService.js";

export const login = (req, res) => {
  const { userName, passowrd } = req.body;

  const user = findUser(userName, passowrd);
  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = generateToken(user);
  res.json({ token });
};
