import logger from "../utils/Logger.js";
import MessagesDAOFactory from "../persistence/DAOs/factories/MessagesDAO.js";

class MessagesService {
  constructor() {
    this.dao = MessagesDAOFactory.getDAO();
  }

  async getMessages(email) {
    logger.info("Consultando mensajes");
    return await this.dao.getAll(email);
  }

  async saveMessage(message) {
    logger.info("Guardando mensaje");
    return await this.dao.save({
      email: message.email,
      message: message.message,
      date: new Date().toLocaleString(),
    });
  }
}

export default MessagesService;
