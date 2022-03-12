import CustomError from "../../../utils/CustomError.js";
import DB from "../../clients/FirestoreDBClient.js";
import configData from "../../../configDB.js";

const { messagesCollection } = configData.firestore;

class MessagesDAOFirestore {
  async getAll(email) {
    try {
      const doc = DB.collection(messagesCollection);
      const snapshot = await doc.get();

      if (snapshot.empty) return [];

      return snapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((message) => message.email !== email);
    } catch (error) {
      if (typeof error === typeof CustomError) throw error;
      throw new CustomError(500, "error al obtener los mensajes", error);
    }
  }

  async save(message) {
    try {
      const doc = await DB.collection(messagesCollection).add({ ...message });
      const newMessage = await doc.get();

      return { ...newMessage.data(), id: newMessage.id };
    } catch (error) {
      throw new CustomError(500, "error al guardar mensaje", error);
    }
  }
}

export default MessagesDAOFirestore;
