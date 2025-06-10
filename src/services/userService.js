import users from "../models/userData.json" with {type: 'json'};

export class UserService {
  getUser(userId) {
    const user = users.find((user) => user.id === userId)
    if (!user) {
      throw new Error(`Usuário com id ${userId} não encontrado`) ;
    }
    return user
  }
  findUser(username, password) {
    return users.find(
      (user) => user.username === username && user.password === password
    );
  };

}