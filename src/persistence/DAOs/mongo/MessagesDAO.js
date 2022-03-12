import MessageModel from "../../../models/Message.js";
import CustomError from "../../../utils/CustomError.js";

class MessagesDAOMongo {
  async getAll(email) {
    try {
      const messages = await MessageModel.find(email ? { email } : {}).lean();
      return messages.map((message) => ({ ...message, id: message._id }));
    } catch (error) {
      throw new CustomError(500, "error al obtener los mensajes", error);
    }
  }

  async save(message) {
    try {
      const newMessage = await MessageModel.create(message);
      return { ...newMessage.toObject(), id: newMessage._id };
    } catch (error) {
      throw new CustomError(500, "error al guardar mensaje", error);
    }
  }
}

export default MessagesDAOMongo;
