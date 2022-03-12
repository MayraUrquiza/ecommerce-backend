import { User } from "../models/User.js";
import UsersDAOFactory from "../persistence/DAOs/factories/UsersDAO.js";
import getDTO from "../persistence/DTOs/UserDTO.js";
import { createHash } from "../utils/bcrypt.js";

class UsersRepository {
  constructor() {
    this.dao = UsersDAOFactory.getDAO();
  }

  async getAll() {
    const users = await this.dao.getAll();
    return users.map((product) => new User(product));
  }

  async getById(id) {
    const user = await this.dao.getById(id);
    return new User(user);
  }

  async getByEmail(email) {
    return await this.dao.getByEmail(email);
  }

  async save(user) {
    const dto = getDTO(user);
    dto.password = createHash(user.password);

    return await this.dao.save(dto);
  }
}

export default UsersRepository;
