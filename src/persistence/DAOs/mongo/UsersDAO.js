import UserModel from "../../../models/User.js";
import CustomError from "../../../utils/CustomError.js";
import getDTO from "../../DTOs/UserDTO.js";

class UsersDAOMongo {
  async getAll() {
    try {
      const users = await UserModel.find().lean();
      return getDTO(
        users.map((user) => ({ ...user, id: user._id }))
      );
    } catch (error) {
      throw new CustomError(500, "error al obtener todos los usuarios", error);
    }
  }

  async getById(id) {
    try {
      const user = await UserModel.findOne({ _id: id }).lean();

      if (!user)
        throw new CustomError(404, "usuario no encontrado", { id });

      return getDTO({ ...user, id: user._id });
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
      const user = await UserModel.findOne({ email }).lean();

      if (!user)
        throw new CustomError(404, "usuario no encontrado", { email });

      return getDTO({ ...user, email: user._id });
    } catch (error) {
      throw new CustomError(
        error.status ?? 500,
        error.description ?? `error al obtener el usuario con email ${email}`,
        error.error ?? error
      );
    }
  }

  async save(user) {
    try {
      const newUser = await UserModel.create(user);
      return getDTO({ ...newUser.toObject(), id: newUser._id });
    } catch (error) {
      throw new CustomError(500, "error al guardar usuario", error);
    }
  }
}

export default UsersDAOMongo;
