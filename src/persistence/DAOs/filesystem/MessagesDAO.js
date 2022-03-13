import CustomError from "../../../utils/CustomError.js";
import configData from "../../../configDB.js";
import FileSystemDAO from "./FileSystemDAO.js";

const { messagesFile } = configData.fileSystem;

class MessagesDAOFilesystem extends FileSystemDAO {
  constructor() {
    super(messagesFile);
  }

  async getAll(email) {
    try {
      await this.checkExistence();

      const fileContent = await this.readFile();
      if (email)
        return JSON.parse(fileContent).filter(
          (message) => message.email === email
        );
      return JSON.parse(fileContent);
    } catch (error) {
      throw new CustomError(500, "error al obtener los mensajes", error);
    }
  }

  async save(message) {
    try {
      await this.checkExistence();

      const content = await this.getAll();
      const id = content.length ? content[content.length - 1].id + 1 : 1;
      const newMessage = { ...message, id };

      content.push(newMessage);

      await this.persist(content);

      return newMessage;
    } catch (error) {
      throw new CustomError(
        error.status ?? 500,
        error.description ?? "error al guardar mensaje",
        error.error ?? error
      );
    }
  }
}

export default MessagesDAOFilesystem;
