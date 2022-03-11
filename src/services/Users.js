import UsersRepository from "../repositories/UsersRepository.js";
import CustomError from "../utils/CustomError.js";

class UsersService {
  constructor() {
    this.repository = new UsersRepository();
  }

  async getUsers() {
    return await this.repository.getAll();
  }

  async getUserById(id) {
    this.validateId(id);
    return await this.repository.getById(id);
  }

  async saveUser(data) {
    this.validateData(data);
    return await this.repository.save(data);
  }

  validateId(id) {
    if (!id) throw new CustomError(400, "el parámetro id es necesario");
  }

  validateData(data) {
    if (!data.name) throw new CustomError(400, "el parámetro name es necesario");
    if (!data.email) throw new CustomError(400, "el parámetro email es necesario");
    // if (!data.age) throw new CustomError(400, "el parámetro age es necesario");
    if (!data.address)
      throw new CustomError(400, "el parámetro address es necesario");
    if (!data.phone) throw new CustomError(400, "el parámetro phone es necesario");
    // if (!data.image) throw new CustomError(400, "el parámetro image es necesario");
  }
}

export default UsersService;
