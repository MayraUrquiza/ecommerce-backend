import MessagesService from "../services/Messages.js";
import logger from "../utils/Logger.js";
import { Server as IOServer } from "socket.io";

class ChatController {
  constructor() {
    this.service = new MessagesService();
  }

  getMessages = async (req, res) => {
    try {
      const io = new IOServer(req.app.get("http server"));

      io.on("connection", async (socket) => {
        logger.info("Nuevo cliente conectado a /chat");

        const messages = await this.service.getMessages();

        socket.emit("refreshMessages", messages);

        socket.on("addMessage", async (message) => {
          await this.service.saveMessage(message);
          const messages = await this.service.getMessages();

          socket.emit("refreshMessages", messages);
        });
      });

      res.render("main", {});
    } catch (error) {
      logger.error(error);
      res.status(error.status || 500).json({ error: error.message ?? error });
    }
  };

  getMessagesByEmail = async (req, res) => {
    try {
      const io = new IOServer(req.app.get("http server"));
      const { email } = req.params;

      io.on("connection", async (socket) => {
        logger.info(`Nuevo cliente conectado a /chat/${email}`);

        const messages = await this.service.getMessages(email);

        socket.emit("refreshMessages", messages);

        socket.on("addMessage", async (message) => {
          await this.service.saveMessage(message);
          const messages = await this.service.getMessages(email);

          socket.emit("refreshMessages", messages);
        });
      });

      res.render("main", {});
    } catch (error) {
      logger.error(error);
      res.status(error.status || 500).json({ error: error.message ?? error });
    }
  };
}

export default ChatController;
