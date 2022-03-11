import CustomError from "../../../utils/CustomError.js";
import DB from "../../clients/FirestoreDBClient.js";
import getDTO from "../../DTOs/UserDTO.js";
import configData from "../../../configDB.js";

const { usersCollection } = configData.firestore;

class UsersDAOFirestore {
  async getAll() {
    try {
      const snapshot = await DB.collection(usersCollection).get();
      const users = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      return getDTO(users);
    } catch (error) {
      if (typeof error === typeof CustomError) throw error;
      throw new CustomError(500, "error al obtener todos los usuarios", error);
    }
  }

  async getById(id) {
    try {
      const doc = DB.collection(usersCollection).doc(id);
      const user = await doc.get();

      if (!user)
        throw new CustomError(404, "usuario no encontrado", { id });

      return getDTO({ ...user.data(), id });
    } catch (error) {
      throw new CustomError(
        error.status ?? 500,
        error.description ?? `error al obtener el usuario con id ${id}`,
        error.error ?? error
      );
    }
  }

  async save(user) {
    try {
      const doc = await DB.collection(usersCollection).add({ ...user });
      const newUser = await doc.get();

      return getDTO({ ...newUser.data(), id: newUser.id });
    } catch (error) {
      throw new CustomError(500, "error al guardar usuario", error);
    }
  }
}

export default UsersDAOFirestore;
