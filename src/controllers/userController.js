import { createUserSchema } from "../config/config.js";
import { UserService } from "../services/userService.js";
import validator from "validator";

const userService = new UserService();
export class UserController {
  getUser(req, res) {
    try {
      const userId = String(req.user.id);
      if (!userId) {
        throw new Error(`Erro: Id não encontrado na requisição`);
      }
      const user = userService.getUser(userId);
      if (!user) {
        throw new Error(
          `Erro: Usuário com o id ${userId}, não foi encontrado `
        );
      }
      return res.json({ user });
    } catch (err) {
      console.error(`Erro ao buscar dados do usuário logado: ${err.message}`);
    }
  }

  createUser(req, res) {
    try {
      const { error, value } = createUserSchema.validate(req.body, {
        abortEarly: false,
      });

      if (error) {
        return res.status(400).json({
          message: "Erro de validação",
          errors: error.details.map((err) => err.message), // Lista mensagens de erro
        });
      }

      const { username, password, email, profile } = value;

      const sanitazedUsername = validator.escape(String(username));
      const sanitizedPassword = validator.escape(String(password));
      const sanitaizedEmail = validator.escape(String(email));
      const sanitaizedProfile = validator.escape(String(profile));

      const newUser = userService.createUser(
        sanitazedUsername,
        sanitizedPassword,
        sanitaizedEmail,
        sanitaizedProfile
      );
      return res.json({ newUser });
    } catch (err) {
      res.status(500).json({
        message: `Erro inesperado ao criar usuário :${err.message}`,
      });
      console.error(`Erro ao criar usuário: ${err}`);
    }
  }
}
