import CartsRepository from "../repositories/CartsRepository.js";
import UsersRepository from "../repositories/UsersRepository.js";
import CustomError from "../utils/CustomError.js";
import logger from "../utils/Logger.js";

class UsersService {
  constructor() {
    this.repository = new UsersRepository();
    this.cartRepository = new CartsRepository()
  }

  async getUsers() {
    logger.info("Consultando usuarios");
    return await this.repository.getAll();
  }

  async getUserByEmail(email) {
    logger.info(`Buscando usuario con email ${email}`);
    return await this.repository.getByEmail(email);
  }

  async saveUser(data) {
    let user;
    try {
      user = await this.repository.getByEmail(data.email);
    } catch (error) {
      logger.info("Creando usuario");
    }

    if (user)
      throw new CustomError(
        400,
        `ya existe un usuario con el email ${data.email}`
      );

    this.validateData(data);
    const newUser = await this.repository.save(data);

    logger.info("Creando carrito");
    await this.cartRepository.createCart({user: newUser.id});

    return newUser;
  }

  validateId(id) {
    if (!id) throw new CustomError(400, "el parámetro id es necesario");
  }

  validateData(data) {
    if (!data.name)
      throw new CustomError(400, "el parámetro name es necesario");
    if (!data.email)
      throw new CustomError(400, "el parámetro email es necesario");
    // if (!data.age) throw new CustomError(400, "el parámetro age es necesario");
    if (!data.address)
      throw new CustomError(400, "el parámetro address es necesario");
    if (!data.phone)
      throw new CustomError(400, "el parámetro phone es necesario");
    // if (!data.image) throw new CustomError(400, "el parámetro image es necesario");
  }
}

export default UsersService;
