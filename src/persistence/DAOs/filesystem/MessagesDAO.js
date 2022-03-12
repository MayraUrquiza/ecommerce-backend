import * as fs from "fs";
import { join } from "path";
import CustomError from "../../../utils/CustomError.js";
import configData from "../../../configDB.js";

const { messagesFile } = configData.fileSystem;
const FILE_PATH = join(process.cwd(), "data/");
const FILE = FILE_PATH.concat(messagesFile);

class MessagesDAOFilesystem {
  async persist(array = []) {
    const fileContent = JSON.stringify(array, null, 2);

    if (!fs.existsSync(FILE_PATH)) fs.promises.mkdir(FILE_PATH);
    return fs.promises.writeFile(FILE, fileContent);
  }

  async checkExistence() {
    const exist = fs.existsSync(FILE);
    if (!exist) await this.persist();
  }

  async getAll(email) {
    try {
      await this.checkExistence();

      const fileContent = await fs.promises.readFile(FILE);
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
