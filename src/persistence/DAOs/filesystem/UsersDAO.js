import CustomError from "../../../utils/CustomError.js";
import getDTO from "../../DTOs/UserDTO.js";
import configData from "../../../configDB.js";
import FileSystemDAO from "./FileSystemDAO.js";

const { usersFile } = configData.fileSystem;

class UsersDAOFilesystem extends FileSystemDAO {
  constructor() {
    super(usersFile);
  }

  async getAll() {
    try {
      await this.checkExistence();

      const fileContent = await this.readFile();
      const users = JSON.parse(fileContent);
      return getDTO(users);
    } catch (error) {
      throw new CustomError(500, "error al obtener todos los usuarios", error);
    }
  }

  async getById(id) {
    try {
      await this.checkExistence();

      const content = await this.getAll();
      const user = content.find((entry) => entry.id === parseInt(id));

      if (!user)
        throw new CustomError(404, "usuario no encontrado", { id });

      return getDTO(user);
    } catch (error) {
      throw new CustomError(
        error.status ?? 500,
        error.description ?? `error al obtener el usuario con id ${id}`,
        error.error ?? error
      );
    }
  }

  async getByEmail(email) {
    try {
      await this.checkExistence();

      const content = await this.getAll();
      const user = content.find((entry) => entry.email === email);

      if (!user)
        throw new CustomError(404, "usuario no encontrado", { email });

      return getDTO(user);
    } catch (error) {
      throw new CustomError(
        error.status ?? 500,
        error.description ?? `error al obtener el usuario con email ${email}`,
        error.error ?? error
      );
    }
  }

  async save(product) {
    try {
      await this.checkExistence();

      const content = await this.getAll();
      const id = content.length ? content[content.length - 1].id + 1 : 1;
      const newUser = { ...product, id };

      content.push(newUser);

      await this.persist(content);

      return getDTO(newUser);
    } catch (error) {
      throw new CustomError(
        error.status ?? 500,
        error.description ?? "error al guardar usuario",
        error.error ?? error
      );
    }
  }
}

export default UsersDAOFilesystem;
