import { AuthService } from "../services/authService.js";
import { UserService } from "../services/userService.js";
const auth = new AuthService();
const user = new UserService();

export class AuthController {
  login(req, res) {
    // console.log("=== DEBUG LOGIN ===");
    // console.log("req.body:", req.body);
    // console.log("Content-Type:", req.headers["content-type"]);
    // console.log("===================");
    const { userName, passowrd } = req.body;

    const user = user.findUser(userName, passowrd);
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = genereteToken(user);
    res.json({ token });
  }
}
