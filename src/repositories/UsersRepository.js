import { User } from "../models/User.js";
import UsersDAOFactory from "../persistence/DAOs/factories/UsersDAO.js";
import getDTO from "../persistence/DTOs/UserDTO.js";

class UsersRepository {
  constructor() {
    this.dao = UsersDAOFactory.getDAO();
  }

  async getAll() {
    const users = await this.dao.getAll();
    return users.map(product => new User(product));
  }

  async getById(id) {
    const user = await this.dao.getById(id);
    return new User(user);
  }

  async save(user) {
    return await this.dao.save(getDTO(user));
  }
}

export default UsersRepository;
