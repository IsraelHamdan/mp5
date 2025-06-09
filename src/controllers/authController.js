import { UserService } from "../services/userService.js";
import { AuthService } from "../services/authService.js";
const userService = new UserService();
const auth = new AuthService();
export class AuthController {
  login(req, res) {
    console.log(`body da requisição: ${JSON.stringify(req.body)}`);
    const { username, password } = req.body;
    const user = userService.findUser(username, password);
    console.log(
      "🚀 ~ AuthController ~ login ~ username, password:",
      username,
      password
    );
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = auth.genereteToken(user);
    res.json({ token });
  }
}
