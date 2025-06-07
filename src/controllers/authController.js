import { genereteToken, findUser } from "../services/authService.js";

export const login = (req, res) => {
  // console.log("=== DEBUG LOGIN ===");
  // console.log("req.body:", req.body);
  // console.log("Content-Type:", req.headers["content-type"]);
  // console.log("===================");
  const { userName, passowrd } = req.body;

  const user = findUser(userName, passowrd);
  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  const token = genereteToken(user);
  res.json({ token });
};
