import { UserService } from "../services/userService.js";
import { AuthService } from "../services/authService.js";
import validator from "validator";
import { loginSchema } from "../config/config.js";

const userService = new UserService();
const auth = new AuthService();
export class AuthController {
  login(req, res) {
    const { error, value } = loginSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      // Retorna erros de validação
      return res.status(400).json({
        message: "Erro de validação",
        errors: error.details.map((err) => err.message), // Lista mensagens de erro
      });
    }

    const { username, password } = value;

    const sanitezedUsername = validator.escape(String(username));
    const sanitizedPassword = validator.escape(String(password));

    const user = userService.findUser(sanitezedUsername, sanitizedPassword);

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = auth.genereteToken(user);
    res.json({ token });
  }
}
