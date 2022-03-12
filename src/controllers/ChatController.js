import MessagesService from "../services/Messages.js";

class ChatController {
  constructor() {
    this.service = new MessagesService();
  }

  getMessages = async () => {
    try {
      return await this.service.getMessages();
    } catch (error) {
      return { error };
    }
  };

  getMessagesByEmail = async (email) => {
    try {
      return await this.service.getMessages(email);
    } catch (error) {
      return { error };
    }
  };

  saveMessage = async (message) => {
    try {
      return await this.service.saveMessage(message);
    } catch (error) {
      throw new CustomError(500, "error al guardar mensaje", error);
    }
  };
}

export default ChatController;
