import { UserService } from "../services/userService.js";

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
}
