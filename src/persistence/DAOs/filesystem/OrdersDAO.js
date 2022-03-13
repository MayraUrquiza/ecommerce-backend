import CustomError from "../../../utils/CustomError.js";
import getDTO from "../../DTOs/OrderDTO.js";
import configData from "../../../configDB.js";
import FileSystemDAO from "./FileSystemDAO.js";

const { ordersFile } = configData.fileSystem;

class OrdersDAOFilesystem extends FileSystemDAO {
  constructor() {
    super(ordersFile);
  }

  async getAll() {
    try {
      await this.checkExistence();

      const fileContent = await this.readFile();
      const orders = JSON.parse(fileContent);
      return getDTO(orders);
    } catch (error) {
      throw new CustomError(500, "error al obtener todas las órdenes", error);
    }
  }

  async save(order) {
    try {
      await this.checkExistence();

      const content = await this.getAll();
      const id = content.length ? content[content.length - 1].id + 1 : 1;
      const newOrder = { ...order, id };

      content.push(newOrder);

      await this.persist(content);

      return getDTO(newOrder);
    } catch (error) {
      throw new CustomError(
        error.status ?? 500,
        error.description ?? "error al guardar orden",
        error.error ?? error
      );
    }
  }
}

export default OrdersDAOFilesystem;
